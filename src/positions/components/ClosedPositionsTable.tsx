import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { ClosedPosition } from "../types";
import { ScrollView, Text } from "react-native";
import { Table } from "../../shared/components/Table";
import { useClosedPositions } from "../hooks/use-closed-positions";
import ProfitText from "../../shared/components/ProfitText";

export function ClosedPositionsTable() {
    const { data, isPending, error } = useClosedPositions()

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
            accessorKey: 'price_exit',
            header: 'Exit price',
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

    const closedPositionsTable = useTable({
        key: 'closed-positions-table',
        features,
        columns,
        data,
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <ScrollView>
            <Text>Closed positions: {data.length}</Text>

            <Table table={closedPositionsTable} />
        </ScrollView>
    )
}
