"use client"

import { xor } from "lodash-es"

import { cn, toSentenceCase } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Badge } from "@/components/ui/badge"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const statuses = ["active", "inactive", "no validators", "invalid"]
export function StatusFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = Boolean(filters.status?.length)
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={hasSelectedItems ? "secondary" : "outline"}
          {...props}
        >
          Status{" "}
          {hasSelectedItems && (
            <Badge size="xs" variant="info">
              {filters.status?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
        <Command>
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>This list is empty.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  className="flex h-10 items-center space-x-2 px-2"
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      status: xor(prev.status, [
                        status as
                          | "active"
                          | "inactive"
                          | "no validators"
                          | "invalid",
                      ]),
                    }))
                  }}
                >
                  <Checkbox
                    id={status}
                    checked={filters.status?.includes(status)}
                    className="mr-2"
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                  >
                    {toSentenceCase(status)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
