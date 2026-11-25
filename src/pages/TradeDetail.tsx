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
  const { status, id } = useParams<{
    status: PositionStatus;
    id?: string;
  }>();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1M");

  const {
    data: ticketDetail,
    isPending: ticketDetailPending,
    error: ticketDetailError,
  } = usePositionDetail(status as PositionStatus, Number(id));

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

  const prices = chartData.flatMap((candle) => [
    Number(candle.low),
    Number(candle.high),
  ]);

  const entryPrice = Number(ticketDetail.price_open);
  const stopLoss = Number(ticketDetail.stop_loss);
  const takeProfit = Number(ticketDetail.take_profit);
  const currentPrice = Number(ticketDetail.price_current);
  const exitPrice = Number(ticketDetail.price_exit);

  if (entryPrice > 0) prices.push(entryPrice);

  if (ticketDetail.status === 'open') {
    if (stopLoss > 0) prices.push(stopLoss);
    if (takeProfit > 0) prices.push(takeProfit);
    if (currentPrice > 0) prices.push(currentPrice);
  }

  if (ticketDetail.status === 'closed' && exitPrice > 0) {
    prices.push(exitPrice);
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const padding = (maxPrice - minPrice) * 0.05 || 0.01;

  return (
    <View>
      <Group justify="space-between" align="center" mb="xl">
        <Text fw={600} size="md">
          {id} - {ticketDetail.symbol}
        </Text>

        <TimeFilterSelector
          value={timeFilter}
          onChange={setTimeFilter}
        />
      </Group>

      <CandlestickChart
        h={500}
        data={chartData}
        dataKey="date"
        tickLine="none"
        valueFormatter={(value) => Number(value).toFixed(2)}
        yAxisProps={{
          domain: [
            minPrice - padding,
            maxPrice + padding,
          ],
        }}
        referenceLines={[
          ...(entryPrice > 0
            ? [{
              y: entryPrice,
              label: `ENTRY: ${entryPrice.toFixed(2)}`,
              color: 'blue.6',
            }]
            : []),

          ...(ticketDetail.status === 'open' && stopLoss > 0
            ? [{
              y: stopLoss,
              label: `SL: ${stopLoss.toFixed(2)}`,
              color: 'red.6',
            }]
            : []),

          ...(ticketDetail.status === 'open' && takeProfit > 0
            ? [{
              y: takeProfit,
              label: `TP: ${takeProfit.toFixed(2)}`,
              color: 'teal.6',
            }]
            : []),

          ...(ticketDetail.status === 'open' && currentPrice > 0
            ? [{
              y: currentPrice,
              label: `CURRENT: ${currentPrice.toFixed(2)}`,
              labelPosition: 'insideBottomRight',
              color: 'yellow.6',
            }]
            : []),

          ...(ticketDetail.status === 'closed' && exitPrice > 0
            ? [{
              y: exitPrice,
              label: `EXIT: ${exitPrice.toFixed(2)}`,
              labelPosition: 'insideBottomRight',
              color: 'grape.6',
            }]
            : []),
        ]}
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
