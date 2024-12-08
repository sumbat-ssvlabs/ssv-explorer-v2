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

const clients = ["geth", "nethermind", "besu", "erigon"]
export function Eth1ClientFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = Boolean(filters.eth1?.length)
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="outline" {...props}>
          ETH1 Client{" "}
          {hasSelectedItems && (
            <Badge size="xs" variant="info">
              {filters.eth1?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
        <Command
        // filter={(value, search, keywords) => {
        //   return 1
        // }}
        >
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>This list is empty.</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client}
                  value={client}
                  className="flex h-10 items-center space-x-2 px-2"
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      eth1: xor(prev.eth1, [client]),
                    }))
                  }}
                >
                  <Checkbox
                    id={client}
                    checked={filters.eth1?.includes(client)}
                    className="mr-2"
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                  >
                    {toSentenceCase(client)}
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