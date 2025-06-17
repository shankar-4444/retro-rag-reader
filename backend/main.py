from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from rag_engine import rag_pipeline  # returns (final_answer, source_answers)

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query")
async def query_endpoint(req: Request):
    data = await req.json()
    query = data.get("query", "")
    final_answer = rag_pipeline(query)  # Discard sources
    return {
        "final_answer": final_answer  # Only the clean, concise answer
    }

@app.get("/")
def read_root():
    return {"message": "Backend is running. Use POST /query to interact."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
