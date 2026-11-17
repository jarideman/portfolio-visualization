import { Button, Group, ScrollArea } from "@mantine/core";
import { TIME_FILTERS, type TimeFilter } from "../../types";

interface TimeFilterProps {
  value: TimeFilter;
  onChange: (value: TimeFilter) => void;
}

export const TimeFilterSelector = ({
  value,
  onChange,
}: TimeFilterProps) => {
  return (
    <ScrollArea type="never">
      <Group gap={8} wrap="nowrap">
        {TIME_FILTERS.map((filter) => {
          const isActive = value === filter.value;

          return (
            <Button
              key={filter.value}
              size="xs"
              radius="md"
              variant={isActive ? "filled" : "light"}
              color={isActive ? "blue" : "dark"}
              onClick={() => onChange(filter.value)}
              bg={isActive
                ? "blue"
                : "gray.9"}
            >
              {filter.label}
            </Button>
          );
        })}
      </Group>
    </ScrollArea>
  );
};
