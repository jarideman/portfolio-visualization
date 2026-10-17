from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from candles.main import get_candles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/candles")
def candles():
    return get_candles()
    