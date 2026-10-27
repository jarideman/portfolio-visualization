import { View } from "react-native";
import { ClosedPositionsTable } from "../positions/components/ClosedPositionsTable";
import { OpenPositionsTable } from "../positions/components/OpenPositionsTable";
import { Tabs, Text, Badge } from "@mantine/core";

export default function Trades() {
  return (
    <View>
      <Text>MT5 Market Data</Text>

      <Tabs defaultValue="open">
        <Tabs.List>
          <Tabs.Tab value="open">
            Open
          </Tabs.Tab>

          <Tabs.Tab value="closed">
            Closed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="open">
          <OpenPositionsTable />
        </Tabs.Panel>

        <Tabs.Panel value="closed">
          <ClosedPositionsTable />
        </Tabs.Panel>
      </Tabs>
    </View>
  );
}
