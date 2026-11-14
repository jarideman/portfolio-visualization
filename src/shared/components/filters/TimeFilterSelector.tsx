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
              styles={{
                root: {
                  flexShrink: 0,
                  backgroundColor: isActive
                    ? "#2563EB"
                    : "#1E293B",
                  border: `1px solid ${
                    isActive ? "#2563EB" : "#334155"
                  }`,
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "#1D4ED8"
                      : "#334155",
                  },
                },
                label: {
                  fontWeight: 600,
                },
              }}
            >
              {filter.label}
            </Button>
          );
        })}
      </Group>
    </ScrollArea>
  );
};