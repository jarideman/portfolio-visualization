import { View } from "react-native";
import { CandlestickChart, PieChart } from "@mantine/charts";
import { useAllocations } from "../dashboard/hooks/use-closed-positions";
import { Card, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { DetailRow } from "../shared/components/DetailRow";

export default function Dashboard() {
  const { data, isPending, error } = useAllocations()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const chartdata = [
    { date: 'Mar 01', open: 136, high: 142, low: 133, close: 140 },
    { date: 'Mar 02', open: 140, high: 145, low: 138, close: 139 },
    { date: 'Mar 03', open: 139, high: 141, low: 129, close: 131 },
    { date: 'Mar 04', open: 131, high: 134, low: 124, close: 125 },
    { date: 'Mar 05', open: 125, high: 133, low: 124, close: 132 },
    { date: 'Mar 06', open: 132, high: 138, low: 131, close: 137 },
    { date: 'Mar 07', open: 137, high: 137, low: 128, close: 129 },
    { date: 'Mar 08', open: 129, high: 135, low: 127, close: 134 },
    { date: 'Mar 09', open: 134, high: 148, low: 133, close: 146 },
    { date: 'Mar 10', open: 146, high: 152, low: 144, close: 151 },
    { date: 'Mar 11', open: 151, high: 154, low: 143, close: 145 },
    { date: 'Mar 12', open: 145, high: 149, low: 142, close: 148 },
    { date: 'Mar 13', open: 148, high: 156, low: 147, close: 155 },
    { date: 'Mar 14', open: 155, high: 158, low: 150, close: 152 },
    { date: 'Mar 15', open: 152, high: 153, low: 141, close: 143 },
    { date: 'Mar 16', open: 143, high: 147, low: 139, close: 146 },
    { date: 'Mar 17', open: 146, high: 160, low: 145, close: 159 },
    { date: 'Mar 18', open: 159, high: 164, low: 156, close: 157 },
    { date: 'Mar 19', open: 157, high: 162, low: 153, close: 161 },
    { date: 'Mar 20', open: 161, high: 168, low: 160, close: 166 },
  ];

  const portfolioDetails = [
    {
      label: "Total Portfolio Value",
      value: 0,
    },
    {
      label: "Total P&L",
      value: 0,
    },
    {
      label: "Total Return (%)",
      value: 0,
    },
    {
      label: "Today's P&L",
      value: 0,
    },
    {
      label: "Cash Balance",
      value: 0,
    },
  ];

  const riskDetails = [
    {
      label: "Maximum Drawdown",
      value: 0,
    },
    {
      label: "Win Rate",
      value: 0,
    },
    {
      label: "Profit Factor",
      value: 0,
    },
    {
      label: "Average Win",
      value: 0,
    },
    {
      label: "Average Loss",
      value: 0,
    },
  ];

  const cardProps = {
    bg: "dark.7",
    c: "gray.0",
    radius: "lg",
    p: "lg",
    withBorder: true,
    style: {
      borderColor: "#263247",
    },
  };

  return (
    <View>
      <SimpleGrid
        spacing="lg"
      >
        <View>
          <Text fw={600} size="md">
            Performance chart
          </Text>

          <CandlestickChart h={300} data={chartdata} dataKey="date" tickLine="none" />
        </View>
      </SimpleGrid>

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
        spacing="lg"
      >
        <Card {...cardProps}>
          <Group gap="sm" mb="md">
            <Text fw={600} size="md">
              Portfolio summary
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            {portfolioDetails.map((detail, index) => (
              <DetailRow
                key={detail.label}
                label={detail.label}
                value={detail.value}
                isLast={portfolioDetails.length - 1 === index}
              />
            ))}
          </Stack>
        </Card>

        <Card {...cardProps}>
          <Group gap="sm" mb="md">
            <Text fw={600} size="md">
              Portfolio summary
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            {riskDetails.map((detail, index) => (
              <DetailRow
                key={detail.label}
                label={detail.label}
                value={detail.value}
                isLast={riskDetails.length - 1 === index}
              />
            ))}
          </Stack>
        </Card>

        <Card {...cardProps}>
          <Group gap="sm" mb="md">
            <Text fw={600} size="md">
              Allocation
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            <PieChart withLabelsLine labelsPosition="inside" labelsType="percent" withLabels data={data} withLegend />
          </Stack>
        </Card>
      </SimpleGrid>
    </View>
  );
}
