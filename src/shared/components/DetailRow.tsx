import { Group, Text } from "@mantine/core";
import "./DetailRow.css";

type DetailRowProps = {
  label: string;
  value?: string | number;
  customValue?: React.ReactNode;
}

export function DetailRow({ label, value, customValue }: DetailRowProps) {
  return (
    <Group justify="space-between" className="detail-row">
      <Text className="detail-label">{label}</Text>

      {customValue ?? (
        <Text className="detail-value">{value}</Text>
      )}
    </Group>
  );
}