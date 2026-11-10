import { Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import type { DateRangeValue, FilterProps } from '../../types';

export function DateRangeFilter({ column }: FilterProps) {
  const value = (column.getFilterValue() ?? {}) as DateRangeValue;

  const update = (
    key: 'start' | 'end',
    date: string | null,
  ) => {
    const next = {
      ...value,
      [key]: date || undefined,
    };

    column.setFilterValue(
      next.start || next.end ? next : undefined,
    );
  };

  return (
    <Group gap={4} wrap="nowrap">
      <DateInput
        size="xs"
        clearable
        placeholder="Start date"
        value={value.start ?? null}
        onChange={(date) => update("start", date)}
        style={{ flex: 1, minWidth: 0 }}
      />

      <DateInput
        size="xs"
        clearable
        placeholder="End date"
        value={value.end ?? null}
        onChange={(date) => update("end", date)}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Group>
  );
}
