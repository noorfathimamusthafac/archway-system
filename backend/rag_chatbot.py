# rag_chatbot.py
import os
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

VECTOR_PATH = "vector_db/"

def get_db():
    try:
        # Check if the actual index file exists inside the folder
        index_file = os.path.join(VECTOR_PATH, "index.faiss")
        if not os.path.exists(index_file):
            return None
        embeddings = OpenAIEmbeddings()
        db = FAISS.load_local(VECTOR_PATH, embeddings, allow_dangerous_deserialization=True)
        return db
    except Exception as e:
        # Re-raise so the caller can catch it and explain the issue
        raise Exception(f"Failed to load Vector Database: {str(e)}")

_llm = None

def get_llm():
    global _llm
    if _llm is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OpenAI API Key is missing. Please set 'OPENAI_API_KEY' in the Render.com Environment Variables.")
        _llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    return _llm

SYSTEM_RULES = '''
You are Archway AI, an enterprise architectural intelligence.
Rules:
- Answer ONLY from retrieved Archway documents.
- Always include citation: (Document name).
- If answer is not found, say: "Not found in Archway knowledge."
- Never invent data.
- Use plain text (no markdown stars).
'''

def local_fallback_search(question):
    """Foolproof keyword-based search in raw text files if Vector DB is missing/broken."""
    knowledge_path = "data/approved_docs/archway_knowledge.txt"
    if not os.path.exists(knowledge_path):
        return "Not found in Archway knowledge (Logic: Knowledge file missing)."
    
    with open(knowledge_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple semantic split based on newlines
    segments = content.split('\n\n')
    found_segments = []
    
    # Filter out common stop words and keep short industry terms
    stop_words = {'give', 'show', 'tell', 'what', 'with', 'this', 'that', 'from', 'your', 'for'}
    keywords = [k.lower().strip('?,.!"') for k in question.split() if len(k) >= 2 and k.lower() not in stop_words]
    
    # Special mapping for common abbreviations
    synonyms = {"cafe": "cafeteria", "boq": "price", "spec": "product"}
    for k in keywords[:]:
        if k in synonyms: keywords.append(synonyms[k])

    for seg in segments:
        seg_lower = seg.lower()
        match_count = sum(1 for k in keywords if k in seg_lower)
        if match_count > 0:
            found_segments.append((match_count, seg))
    
    found_segments.sort(key=lambda x: x[0], reverse=True)
    if not found_segments:
        return "Not found in Archway knowledge (Logic: No keyword match)."
        
    return "\n\n".join([item[1] for item in found_segments[:4]])

def ask_archway(question):
    try:
        db = get_db()
        context = ""
        sources = ["archway_knowledge.txt"]
        q_lower = question.lower()

        if db:
            try:
                docs = db.similarity_search(question, k=4)
                if docs:
                    context = "\n\n".join([d.page_content for d in docs])
                    sources = list(set([d.metadata.get("source", "Unknown") for d in docs]))
            except: pass
        
        if not context: context = local_fallback_search(question)
        if "Not found" in context: return {"answer": context, "boq_data": None, "element_data": None}

        # --- Structured Data EXTRACTION ---
        boq_data = None
        element_data = None
        
        if any(x in q_lower for x in ["price", "cost", "estimate", "boq", "sqft", "rates"]):
            lines = [l.strip() for l in context.split('\n') if "₹" in l]
            if lines:
                boq_data = []
                for idx, line in enumerate(lines):
                    # Robust splitting for "Description: Price" patterns
                    parts = line.split(":") if ":" in line else ["Line Item", line]
                    desc = parts[0].strip("- ")
                    rate_part = parts[1].strip() if len(parts) > 1 else line
                    
                    # Extract the first number found for the rate, handling commas/thousands
                    # e.g. "₹2,200 - ₹3,500" -> 2200
                    rate_val = "0"
                    # Find all matches for digits with optional commas/dots
                    import re
                    matches = re.findall(r'₹?(\d+(?:,\d+)*(?:\.\d+)?)', rate_part)
                    if matches:
                        rate_val = matches[0].replace(',', '')
                    
                    final_rate = int(float(rate_val))
                    
                    if final_rate > 0:
                        boq_data.append({
                            "code": f"ARC-{idx+101}",
                            "description": desc,
                            "unit": "sqft",
                            "qty": 1,
                            "typRate": final_rate,
                            "brands": ["Standard Archway Spec"]
                        })

        if any(x in q_lower for x in ["product", "detail", "spec", "material"]):
            if "Product:" in context:
                prod_section = [s for s in context.split("- Product:") if len(s) > 10][0]
                lines = prod_section.split("\n")
                name = lines[0].strip()
                desc = next((l.split(":")[1].strip() for l in lines if "Description:" in l), "Technical Product")
                specs_raw = [l.split(":") for l in lines if "Specs:" in l or "Material:" in l]
                specs = {s[0].strip().replace("- ",""): s[1].strip() for s in specs_raw if len(s) > 1}
                
                element_data = {
                    "name": name,
                    "description": desc,
                    "category": "Architectural Element",
                    "specs": specs,
                    "image": f"https://source.unsplash.com/800x600/?architecture,{name.replace(' ', ',')}"
                }

        prompt = f"{SYSTEM_RULES}\n\nContext:\n{context}\n\nQuestion: {question}"
        
        try:
            llm = get_llm()
            response = llm.invoke(prompt).content
            return {
                "answer": response,
                "boq_data": boq_data,
                "element_data": element_data,
                "sources": sources
            }
        except Exception as e:
            err_msg = str(e).lower()
            # If OpenAI fails, return raw text segments in the answer field
            if any(x in err_msg for x in ["insufficient_quota", "model_not_found", "rate_limit", "connection"]):
                return {
                    "answer": f"SYSTEM ALERT: AI Engine Offline ({str(e)}). Serving direct matches from Archway Standards:\n\n{context}",
                    "boq_data": boq_data,
                    "element_data": element_data,
                    "sources": sources
                }
            return {"answer": f"REAL SYSTEM ERROR: {str(e)}", "boq_data": None, "element_data": None}

    except Exception as e:
        return {"answer": f"REAL SYSTEM ERROR: {str(e)}", "boq_data": None, "element_data": None}

if __name__ == "__main__":
    q = "What is the waterproofing standard?"
    print(ask_archway(q))
