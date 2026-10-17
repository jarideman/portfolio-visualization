import { useEffect, useState } from "react";

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function App() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/candles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Python API request failed");
        }
        return response.json();
      })
      .then(setCandles)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>MT5 Market Data</h1>

      {error && <p>Error: {error}</p>}

      <p>Candles retrieved: {candles.length}</p>

      <pre style={{ overflowX: "auto" }}>
        {JSON.stringify(candles.slice(-5), null, 2)}
      </pre>
    </main>
  );
}
