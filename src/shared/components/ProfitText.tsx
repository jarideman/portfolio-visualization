import { Text } from '@mantine/core';

type Props = {
    value: number
}

export default function ProfitText({ value }: Props) {
    const color =
        value === 0
            ? 'gray.6'
            : value > 0
                ? 'green.6'
                : 'red.6';


    return (
        <Text component="span" c={color}>
            {value.toFixed(2)}
        </Text>
    );
}
