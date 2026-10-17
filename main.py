import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

API_DIR = BASE_DIR / "api"
API_FILE = API_DIR / "main.py"

process = subprocess.Popen(
    [
        sys.executable,
        "-m",
        "uvicorn",
        "main:app",
        "--app-dir",
        str(API_DIR),
        "--host",
        "127.0.0.1",
        "--port",
        "8000",
    ],
    cwd=API_DIR,
)

print("API started at http://127.0.0.1:8000")
print("Press Ctrl+C to stop the main application.")

try:
    process.wait()
except KeyboardInterrupt:
    process.terminate()
    process.wait()
