import { View } from "react-native";
import { CandlestickChart, LineChart, PieChart } from "@mantine/charts";
import { useAllocations } from "../dashboard/hooks/use-closed-positions";

export default function Dashboard() {
  const { data: piechartdata, isPending, error } = useAllocations()

  const candlestickdata = [
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


  const data = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const chartData = piechartdata.allocation.map((item) => ({
    name: item.symbol,
    value: item.percentage,
  }));

  return (
    <View>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[
          { name: 'Apples', color: 'indigo.6' },
          { name: 'Oranges', color: 'blue.6' },
          { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType="natural"
        withDots={false}
      />

      <CandlestickChart h={300} data={candlestickdata} dataKey="date" />

      <PieChart withLabelsLine labelsPosition="inside" labelsType="percent" withLabels data={chartData} withLegend />
    </View>
  );
}
