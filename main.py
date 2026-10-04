from connection import init_mt5, deinit_mt5
from sync.run_sync import sync_account_data
from validation.missing_data import check_missing_data


def main():
    if not init_mt5():
        return


    if not check_missing_data:
        sync_account_data()
    else:
        sync_answer = input("Do you want to sync? (y/n): ")

        if sync_answer.lower() == "y":
            sync_account_data()


    try:
        pass

    finally:
        deinit_mt5()


if __name__ == "__main__":
    main()
