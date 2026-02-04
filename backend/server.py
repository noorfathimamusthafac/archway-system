from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from rag_chatbot import ask_archway

app = FastAPI(title="Archway AI Server")

# Enable CORS for the React frontend
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
        # Get structured result from RAG engine
        result = ask_archway(query.question)
        
        # result is now a dict: {"answer": ..., "boq_data": ..., "element_data": ...}
        return result
    except Exception as e:
        # Return error as valid JSON so frontend can display it
        return {"answer": f"BACKEND TECHNICAL ERROR: {str(e)}", "boq_data": None}

@app.get("/")
async def health():
    return {"status": "Archway AI Workstation Backend Online"}

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=False)
