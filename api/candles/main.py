import MetaTrader5 as mt5
from fastapi import HTTPException


def get_candles():
    if not mt5.initialize():
        raise HTTPException(
            status_code=500,
            detail=f"MT5 initialization failed: {mt5.last_error()}",
        )

    try:
        rates = mt5.copy_rates_from_pos(
            "EURUSD",
            mt5.TIMEFRAME_H1,
            0,
            500,
        )

        if rates is None:
            raise HTTPException(
                status_code=500,
                detail=f"Could not fetch rates: {mt5.last_error()}",
            )

        return [
            {
                "time": int(rate["time"]),
                "open": float(rate["open"]),
                "high": float(rate["high"]),
                "low": float(rate["low"]),
                "close": float(rate["close"]),
            }
            for rate in rates
        ]
    finally:
        mt5.shutdown()