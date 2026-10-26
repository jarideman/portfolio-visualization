import { Text } from "react-native";

type Props = {
    value: number
}

export default function ProfitText({ value }: Props) {
    const color =
        value === 0 ? 'grey' :
            value > 0 ? 'green' :
                'red';

    return <Text style={{ color: color }}>{value.toFixed(2)}</Text>
}