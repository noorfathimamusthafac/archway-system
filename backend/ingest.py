# ingest.py
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

DATA_PATH = "data/approved_docs/"
VECTOR_PATH = "vector_db/"

def ingest_documents():
    docs = []
    
    if not os.path.exists(DATA_PATH):
        print(f"Directory {DATA_PATH} does not exist.")
        return

    for file in os.listdir(DATA_PATH):
        filePath = os.path.join(DATA_PATH, file)
        if file.endswith(".pdf"):
            loader = PyPDFLoader(filePath)
            pages = loader.load()
            for p in pages:
                p.metadata["source"] = file
            docs.extend(pages)
        elif file.endswith(".txt"):
            from langchain_community.document_loaders import TextLoader
            loader = TextLoader(filePath)
            pages = loader.load()
            for p in pages:
                p.metadata["source"] = file
            docs.extend(pages)
    
    if not docs:
        print("No PDF documents found in data/approved_docs/")
        return
            
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    
    chunks = splitter.split_documents(docs)
    
    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(chunks, embeddings)
    db.save_local(VECTOR_PATH)
    print(f"Vector database saved to {VECTOR_PATH}")

if __name__ == "__main__":
    ingest_documents()
