import { Group, Text } from "@mantine/core";
import type { DetailRowItem } from "../types";

interface DetailRowProps extends DetailRowItem {
  isLast?: boolean;
};

export function DetailRow({
  label,
  value,
  customValue,
  isLast = false,
}: DetailRowProps) {
  return (
    <Group
      justify="space-between"
      align="center"
      py="md"
      gap="md"
      wrap="nowrap"
      style={
        !isLast
          ? { borderBottom: "1px solid #263247" }
          : {}
      }
    >
      <Text
        c="dimmed"
        size="sm"
        style={{ flexShrink: 0 }}
      >
        {label}
      </Text>

      {
        customValue ?? (
          <Text
            c="gray.0"
            size="sm"
            fw={500}
            ta="right"
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Text>
        )
      }
    </Group >
  );
}
