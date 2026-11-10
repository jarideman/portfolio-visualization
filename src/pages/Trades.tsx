import { View } from "react-native";
import { Tabs } from "@mantine/core";
import { PositionsTable } from "../positions/components/PositionsTable";

export default function Trades() {
  return (
    <View>
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
          <PositionsTable type="open" />
        </Tabs.Panel>

        <Tabs.Panel value="closed">
          <PositionsTable type="closed" />
        </Tabs.Panel>
      </Tabs>
    </View>
  );
}
