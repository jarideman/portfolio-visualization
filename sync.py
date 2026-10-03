from connection.mt5_connection import init_mt5, deinit_mt5
from sync.sync_account_data import sync_account_data

def sync():
    if not init_mt5():
        return

    try:
        sync_account_data()

    finally:
        deinit_mt5()


if __name__ == "__main__":
    sync()
