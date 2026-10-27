import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { ClosedPosition, OpenPosition } from "../types";
import { ScrollView } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";
import ProfitText from "../../shared/components/ProfitText";
import { Badge, Text } from "@mantine/core";

export function OpenPositionsTable() {
  const { data, isPending, error } = useOpenPositions()

  const features = tableFeatures({})

  const columns: Array<ColumnDef<typeof features, ClosedPosition>> = [
    {
      accessorKey: 'symbol',
      header: 'Symbol',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'volume',
      header: 'Volume',
    },
    {
      accessorKey: 'price_open',
      header: 'Entry price',
    },
    {
      accessorKey: 'price_current',
      header: 'Current price',
    },
    {
      accessorKey: 'profit',
      header: 'Profit',
      cell: (info) => <ProfitText value={info.getValue<number>()} />,
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
  ]

  const openPositionsTable = useTable({
    key: 'open-positions-table',
    features,
    columns,
    data,
  })


  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const badges: Array<string> = [...new Set<string>(data.map((item: OpenPosition) => item.symbol))]

  return (
    <ScrollView>
      <Text>Open positions: {data.length}</Text>

      <ScrollView horizontal>
        {badges.map((value: string, index: number) => (
          <Badge key={index}>{value}</Badge>
        ))}
      </ScrollView>

      <Table table={openPositionsTable} />
    </ScrollView>
  )
}
