import { Select, MultiSelect } from '@mantine/core';
import type { OptionsFilterProps } from '../../types';

export function OptionsFilter({
  column,
  options,
  multiple = false,
  placeholder = 'Select...',
}: OptionsFilterProps) {
  const value = column.getFilterValue();

  if (multiple) {
    return (
      <MultiSelect
        size="xs"
        clearable
        searchable
        placeholder={placeholder}
        data={options}
        value={(value as string[]) ?? []}
        onChange={(value) =>
          column.setFilterValue(value.length ? value : undefined)
        }
      />
    );
  }

  return (
    <Select
      size="xs"
      clearable
      searchable
      placeholder={placeholder}
      data={options}
      value={(value as string) ?? null}
      onChange={(value) => column.setFilterValue(value ?? undefined)}
    />
  );
}
