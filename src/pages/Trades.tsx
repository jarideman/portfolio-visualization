import { ScrollView, Text, View } from "react-native";
import { useClosedPositions } from "../positions/hooks/use-closed-positions";
import { useOpenPositions } from "../positions/hooks/use-open-positions";
import type { ClosedPosition, OpenPosition } from "../positions/types";

export default function Trades() {
  const { data: closedPositions, isPending: isPendingClosedPositions, error: closedPositionsError} = useClosedPositions()
  const { data: openPositions, isPending: isPendingOpenPositions, error: openPositionsError} = useOpenPositions()

  if (isPendingClosedPositions || isPendingOpenPositions) return 'Loading...'

  if (closedPositionsError || openPositionsError) return 'An error has occurred: ' + (openPositionsError?.message ?? closedPositionsError?.message)

  return (
    <View>
      <Text>MT5 Market Data</Text>

      <Text>Closed positions: {closedPositions.length}</Text>

      <ScrollView>
        {closedPositions.map((position: ClosedPosition, index: number) => (
          <ScrollView horizontal key={index}>
            <Text>{position.symbol}</Text>

            <Text>{position.profit}</Text>
          </ScrollView>
        ))}
      </ScrollView>

      <p>Open positions: {openPositions.length}</p>

      <ScrollView>
        {openPositions.map((position: OpenPosition, index: number) => (
          <ScrollView horizontal key={index}>
            <Text>{position.symbol}</Text>
            
            {/* red/green/grey for profit/loss/equal */}
            <Text>{position.profit}</Text>
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );
}
