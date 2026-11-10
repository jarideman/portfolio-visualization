import { View } from "react-native";
import { PieChart } from "@mantine/charts";
import { useAllocations } from "../dashboard/hooks/use-closed-positions";

export default function Dashboard() {
  const { data, isPending, error } = useAllocations()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <View>

      <PieChart withLabelsLine labelsPosition="inside" labelsType="percent" withLabels data={data} withLegend />
    </View>
  );
}
