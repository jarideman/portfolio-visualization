import { Text, View } from "react-native";
import { ClosedPositionsTable } from "../positions/components/ClosedPositionsTable";
import { OpenPositionsTable } from "../positions/components/OpenPositionsTable";

export default function Trades() {
  return (
    <View>
      <Text>MT5 Market Data</Text>

      <ClosedPositionsTable />

      <OpenPositionsTable />
    </View>
  );
}
