import { View } from "react-native";
import { CandlestickChart, LineChart, PieChart } from "@mantine/charts";
import { useAllocations } from "../dashboard/hooks/use-closed-positions";
import { Card, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { DetailRow } from "../shared/components/DetailRow";
import { usePortfolioDetails } from "../account/hooks/use-portfolio-details";
import { useRiskDetails } from "../account/hooks/use-risk-details";

export default function Dashboard() {
  const {
    data: allocationData,
    isPending: isPendingAllocations,
    error: allocationsError,
  } = useAllocations();

  const {
    data: portfolioDetails,
    isPending: isPendingPortfolioDetails,
    error: portfolioError,
  } = usePortfolioDetails();

  const {
    data: riskDetails,
    isPending: isPendingRiskDetails,
    error: riskError,
  } = useRiskDetails();

  const isPending =
    isPendingAllocations || isPendingPortfolioDetails || isPendingRiskDetails;

  const error = allocationsError || portfolioError || riskError;

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  const chartData = [
    {
      date: "Mar 22",
      Balance: 1050,
      "P&L": 50,
    },
    {
      date: "Mar 23",
      Balance: 1095,
      "P&L": 95,
    },
    {
      date: "Mar 24",
      Balance: 1025,
      "P&L": 25,
    },
    {
      date: "Mar 25",
      Balance: 1035,
      "P&L": 35,
    },
    {
      date: "Mar 26",
      Balance: 1060,
      "P&L": 60,
    },
  ];

  return (
    <View>
      <SimpleGrid spacing="lg">
        <View>
          <Text fw={600} size="md" mb={20}>
            Performance chart
          </Text>

          <LineChart
            h={300}
            data={chartData}
            dataKey="date"
            series={[
              { name: "Balance", color: "indigo.6" },
              { name: "P&L", color: "blue.6" },
            ]}
            curveType="natural"
            withDots={false}
          />
        </View>
      </SimpleGrid>

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
        spacing="lg"
        mt={50}
      >
        <Card>
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

        <Card>
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

        <Card>
          <Group gap="sm" mb="md">
            <Text fw={600} size="md">
              Allocation
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            <PieChart
              withLabelsLine
              labelsPosition="inside"
              labelsType="percent"
              withLabels
              data={allocationData}
              withLegend
            />
          </Stack>
        </Card>
      </SimpleGrid>
    </View>
  );
}
