import { View } from "react-native";
import { Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { CandlestickChart } from "@mantine/charts";
import { useParams } from "react-router-dom";
import { usePositionDetail } from "../positions/hooks/use-position-detail";
import type { PositionStatus } from "../positions/types";
import { DetailRow } from "../shared/components/DetailRow";
import { firstToUpper } from "../shared/utils/firstToUpper";
import ProfitText from "../shared/components/ProfitText";
import type { DetailRowItem, TimeFilter } from "../shared/types";
import { TimeFilterSelector } from "../shared/components/filters/TimeFilterSelector";
import { useState } from "react";
import { useSymbolData } from "../shared/hooks/use-symbol-data";

export default function TradeDetail() {
  const { status, ticket } = useParams<{ ticket: string; status: PositionStatus }>();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1M");

  const {
    data: ticketDetail,
    isPending: ticketDetailPending,
    error: ticketDetailError,
  } = usePositionDetail(status as PositionStatus, Number(ticket));

  const { data: chartData, isPending: chartDataPending, error: chartDataError } = useSymbolData(ticketDetail?.symbol, timeFilter)

  const isPending = ticketDetailPending || chartDataPending;

  const error = ticketDetailError || chartDataError;

  if (isPending) {
    return <Text c="dimmed">Loading trade information...</Text>;
  }

  if (error) {
    return <Text c="red">{error.message}</Text>;
  }

  const tradeDetailCards: DetailRowItem[][] = [
    [
      {
        label: "Type",
        value: firstToUpper(ticketDetail.type),
      },
      {
        label: "Volume",
        value: ticketDetail.volume,
      },
      {
        label: "Date",
        value: firstToUpper(ticketDetail.date),
      },
    ],
    [
      {
        label: "Entry price",
        value: ticketDetail.price_open,
      },
      ...(status === "closed" ?
        [
          {
            label: "Exit price",
            value: ticketDetail.price_exit,
          },
        ]
        : []),
      ...(status === "open" ?
        [
          {
            label: "Current price",
            value: ticketDetail.price_current,
          },
        ]
        : []),
      {
        label: status === 'open' ? "Floating profit" : "Profit",
        customValue: <ProfitText value={ticketDetail.profit} />,
      }
    ],
  ];

  return (
    <View>
      <Group justify="space-between" align="center" mb="xl">
        <Text fw={600} size="md">
          {ticket} - {ticketDetail.symbol}
        </Text>

        <TimeFilterSelector
          value={timeFilter}
          onChange={setTimeFilter}
        />
      </Group>

      {/* Show entry and exit/current */}
      {/* Show sl en tp for open order */}
      <CandlestickChart
        h={500}
        data={chartData}
        dataKey="date"
        tickLine="none"
        valueFormatter={(value) => Number(value).toFixed(2)}
        referenceLines={
          ticketDetail.status === 'open'
            ? [
              { y: ticketDetail.stop_loss, label: 'Stop loss', color: 'red.6' },
              { y: ticketDetail.take_profit, label: 'Take profit', color: 'teal.6' },
            ]
            : []
        }
      />

      <SimpleGrid
        cols={2}
        spacing="lg"
        mt={32}
      >
        {tradeDetailCards.map((items, index) => (
          <Card key={index}>
            <Stack gap={0}>
              {items.map((item, itemIndex) => (
                <DetailRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  customValue={item.customValue}
                  isLast={itemIndex === items.length - 1}
                />
              ))}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </View>
  );
}
