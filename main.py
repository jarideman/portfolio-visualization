from connection import init_mt5, deinit_mt5
from sync.run_sync import sync_account_data
from validation.missing_data import check_missing_data
import subprocess
import sys
from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent

API_DIR = BASE_DIR / "api"


def main():
    load_dotenv()

    if not init_mt5():
        return


    if not check_missing_data:
        sync_account_data()
    else:
        sync_answer = input("Do you want to sync? (y/n): ")

        if sync_answer.lower() == "y":
            sync_account_data()


    process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "main:app",
            "--app-dir",
            str(API_DIR),
            "--host",
            os.getenv("HOST"),
            "--port",
            os.getenv("PORT"),
        ],
        cwd=API_DIR,
    )


    try:
        process.wait()
    except KeyboardInterrupt:
        process.terminate()
        process.wait()

    finally:
        deinit_mt5()


if __name__ == "__main__":
    main()
