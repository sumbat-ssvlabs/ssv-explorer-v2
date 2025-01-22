"use client"

import { useState } from "react"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function NameFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useOperatorsSearchParams()
  const query = useQuery({
    queryKey: ["operators", "names", search, network],
    queryFn: async () => {
      return searchOperators({
        network,
        search,
        page: 1,
        perPage: 10,
      })
    },
    enabled: open,
  })

  return (
    <FilterButton
      name="Name"
      activeFiltersCount={filters.name?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, name: [] }))}
      popover={{
        root: {
          open,
          onOpenChange: setOpen,
        },
      }}
    >
      <Command>
        <CommandInput
          placeholder="Search Names"
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        <CommandList className="max-h-none overflow-y-auto">
          {query.isPending ? (
            <CommandLoading className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          ) : (
            <CommandEmpty>This list is empty.</CommandEmpty>
          )}
          <CommandGroup>
            {query.data?.data.map((operator) => (
              <CommandItem
                key={operator.id}
                value={operator.name}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    name: xor(prev.name, [operator.name]),
                  }))
                }}
              >
                <Checkbox
                  id={operator.name}
                  checked={filters.name?.includes(operator.name)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {operator.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
