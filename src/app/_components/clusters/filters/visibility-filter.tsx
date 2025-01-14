"use client"

import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

export function VisibilityFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <FilterButton
      name="Private"
      isActive={filters.visibility !== null}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          visibility: null,
        }))
      }
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <RadioGroup>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  visibility: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={!filters.visibility}
                id="all"
                value="all"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                All
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  visibility: "private",
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.visibility === "private"}
                id="private"
                value="private"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Private
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  visibility: "public",
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.visibility === "public"}
                id="public"
                value="public"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Public
              </span>
            </CommandItem>
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
