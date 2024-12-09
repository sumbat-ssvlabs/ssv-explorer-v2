"use client"

import { useState } from "react"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"
import { MdKeyboardReturn } from "react-icons/md"
import { isAddress, type Address } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Badge } from "@/components/ui/badge"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function OwnerAddressFilter(props: ButtonProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useOperatorsSearchParams()
  const query = useQuery({
    queryKey: ["operators", "owner-address", search, network],
    queryFn: async () => {
      return searchOperators({
        network,
        search,
        ordering: "owner_address:asc",
        page: 1,
        perPage: 10,
      })
    },
    select: (data) => [
      ...new Set(
        data.operators.map((operator) => operator.owner_address as Address)
      ),
    ],
    enabled: open && isAddress(search),
  })

  const hasSelectedItems = Boolean(filters.owner?.length)

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={hasSelectedItems ? "secondary" : "outline"}
          {...props}
        >
          Owner Address{" "}
          {hasSelectedItems && (
            <Badge size="xs" variant="info">
              {filters.owner?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[440px] overflow-auto p-0">
        <Command>
          <CommandInput
            placeholder={"Search Owner Address"}
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          {hasSelectedItems && (
            <div className="flex flex-wrap gap-1 border-b p-1">
              {filters.owner?.map((owner_address) => (
                <Button
                  size="sm"
                  key={owner_address}
                  className="h-auto gap-0.5 rounded-full px-2 py-0.5 text-xs"
                  variant="secondary"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      owner: xor(prev.owner, [owner_address]),
                    }))
                  }
                >
                  {shortenAddress(owner_address)} <X className="size-2" />
                </Button>
              ))}
            </div>
          )}
          <CommandList className="max-h-none overflow-y-auto">
            {query.isLoading ? (
              <CommandLoading className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin" />
              </CommandLoading>
            ) : (
              <CommandEmpty>This list is empty.</CommandEmpty>
            )}
            <CommandGroup>
              {query.data?.map((owner_address) => (
                <CommandItem
                  key={owner_address}
                  value={owner_address}
                  className="flex h-10 items-center space-x-2 px-2"
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      owner: xor(prev.owner, [owner_address]),
                    }))
                  }}
                >
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                  >
                    {owner_address}
                  </span>
                  <Badge variant="info" className="rounded-lg">
                    <MdKeyboardReturn className="size-3" />
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
