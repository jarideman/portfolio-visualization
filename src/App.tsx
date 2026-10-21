import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

type OpenPosition = {
  price_open: number;
  tp: number;
  sl: number;
  symbol: string;
  profit: number;
};

type ClosedPosition = {
  price_open: number;
  lot_size: number;
  profit: number;
  symbol: string;
};


export default function App() {
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([]);
  const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/postions/closed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Python API request failed");
        }
        return response.json();
      })
      .then(setClosedPositions)
      .catch((err) => console.error(err.message));

    fetch("http://127.0.0.1:8000/api/postions/open")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Python API request failed");
        }
        return response.json();
      })
      .then(setOpenPositions)
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>MT5 Market Data</h1>

      <p>Closed positions: {closedPositions.length}</p>

      <ScrollView>
        {closedPositions.map((position, index) => (
          <ScrollView horizontal key={index}>
            <Text>{position.symbol}</Text>

            <Text>{position.profit}</Text>
          </ScrollView>
        ))}
      </ScrollView>

      <p>Open positions: {openPositions.length}</p>

      <ScrollView>
        {openPositions.map((position, index) => (
          <ScrollView horizontal key={index}>
            <Text>{position.symbol}</Text>

            <Text>{position.profit}</Text>
          </ScrollView>
        ))}
      </ScrollView>
    </main>
  );
}