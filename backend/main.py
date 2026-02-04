from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag_chatbot import ask_archway

app = FastAPI(title="Archway AI API")

# Essential for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask(query: Query):
    try:
        # Get raw response from RAG system
        raw_response = ask_archway(query.question)
        
        # Parse citations if they exist in the raw response
        # (Preserving the enterprise logic while using your requested endpoint structure)
        text = raw_response
        citations = []
        
        if "\n\nSources: " in raw_response:
            text, sources_part = raw_response.split("\n\nSources: ", 1)
            sources = [s.strip() for s in sources_part.split(",") if s.strip()]
            citations = [{"title": s} for s in sources]

        return {
            "answer": text,
            "citations": citations
        }
    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"status": "Archway Workstation Backend Online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
