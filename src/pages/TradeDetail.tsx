import { View } from "react-native";
import { Card, SimpleGrid, Stack, Text } from "@mantine/core";
import { CandlestickChart } from "@mantine/charts";
import { useParams } from "react-router-dom";
import { usePositionDetail } from "../positions/hooks/use-position-detail";
import type { PositionType } from "../positions/types";
import { DetailRow } from "../shared/components/DetailRow";
import { firstToUpper } from "../shared/utils/firstToUpper";
import ProfitText from "../shared/components/ProfitText";
import type { DetailRowItem } from "../shared/types";

export default function TradeDetail() {
  const { type, ticket } = useParams<{ ticket: string; type: PositionType }>();

  const {
    data: ticketDetail,
    isPending,
    error,
  } = usePositionDetail(type as PositionType, Number(ticket));

  const chartdata = [
    { date: "Mar 01", open: 136, high: 142, low: 133, close: 140 },
    { date: "Mar 02", open: 140, high: 145, low: 138, close: 139 },
    { date: "Mar 03", open: 139, high: 141, low: 129, close: 131 },
    { date: "Mar 04", open: 131, high: 134, low: 124, close: 125 },
    { date: "Mar 05", open: 125, high: 133, low: 124, close: 132 },
    { date: "Mar 06", open: 132, high: 138, low: 131, close: 137 },
    { date: "Mar 07", open: 137, high: 137, low: 128, close: 129 },
    { date: "Mar 08", open: 129, high: 135, low: 127, close: 134 },
    { date: "Mar 09", open: 134, high: 148, low: 133, close: 146 },
    { date: "Mar 10", open: 146, high: 152, low: 144, close: 151 },
    { date: "Mar 11", open: 151, high: 154, low: 143, close: 145 },
    { date: "Mar 12", open: 145, high: 149, low: 142, close: 148 },
    { date: "Mar 13", open: 148, high: 156, low: 147, close: 155 },
    { date: "Mar 14", open: 155, high: 158, low: 150, close: 152 },
    { date: "Mar 15", open: 152, high: 153, low: 141, close: 143 },
    { date: "Mar 16", open: 143, high: 147, low: 139, close: 146 },
    { date: "Mar 17", open: 146, high: 160, low: 145, close: 159 },
    { date: "Mar 18", open: 159, high: 164, low: 156, close: 157 },
    { date: "Mar 19", open: 157, high: 162, low: 153, close: 161 },
    { date: "Mar 20", open: 161, high: 168, low: 160, close: 166 },
  ];

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
        label: "date",
        value: firstToUpper(ticketDetail.date),
      },
    ],
    [
      {
        label: "Entry price",
        value: ticketDetail.price_open,
      },
      ...(type === "closed" ?
        [
          {
            label: "Exit price",
            value: ticketDetail.price_exit,
          },
        ]
        : []),
      ...(type === "open" ?
        [
          {
            label: "Current price",
            value: ticketDetail.price_current,
          },
        ]
        : []),
      {
        label: type === 'open' ? "Floating profit" : "Profit",
        customValue: <ProfitText value={ticketDetail.profit} />,
      }
    ],
  ];

  return (
    <View>
      <Text>
        {ticket} - {ticketDetail.symbol}
      </Text>

      {/* time frame filter? */}
      {/* show entry and exit/current */}
      {/* show sl en tp for open order */}
      <CandlestickChart
        h={500}
        data={chartdata}
        dataKey="date"
        tickLine="none"
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
