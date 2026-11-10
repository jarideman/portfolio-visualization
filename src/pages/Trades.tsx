import { View } from "react-native";
import { Tabs } from "@mantine/core";
import { PositionsTable } from "../positions/components/PositionsTable";

export default function Trades() {
  const tabs = ['open', 'closed'] as const;

  return (
    <View>
      <Tabs defaultValue="open">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab} value={tab}>
            <PositionsTable type={tab} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </View>
  );
}
