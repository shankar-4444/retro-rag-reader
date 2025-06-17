from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from rag_engine import rag_pipeline, history

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query")
async def query_endpoint(req: Request):
    data = await req.json()
    query = data.get("query", "")
    if not query:
        return {"error": "Missing query"}

    final_answer = rag_pipeline(query)

    # Get the latest sources from global history
    latest_sources = history[-1]["sources"] if history else []

    return {
        "answer": final_answer,
        "sources": latest_sources
    }

@app.get("/")
def read_root():
    return {"message": "Backend is running. Use POST /query to interact."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
