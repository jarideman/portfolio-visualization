import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { ClosedPosition } from "../types";
import { ScrollView, Text } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";
import ProfitText from "../../shared/components/ProfitText";

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

  return (
    <ScrollView>
      <Text>Open positions: {data.length}</Text>

      <Table table={openPositionsTable} />
    </ScrollView>
  )
}
