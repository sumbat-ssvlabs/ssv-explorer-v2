"use client"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function VerifiedFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={filters.verified ? "secondary" : "outline"}
          {...props}
        >
          Verified
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
        <Command>
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>This list is empty.</CommandEmpty>
            <RadioGroup>
              <CommandItem
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    verified: null,
                  }))
                }}
              >
                <RadioGroupItem
                  checked={!filters.verified}
                  id="all"
                  value="all"
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  All
                </span>
              </CommandItem>
              <CommandItem
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    verified: "verified",
                  }))
                }}
              >
                <RadioGroupItem
                  checked={filters.verified === "verified"}
                  id="verified"
                  value="verified"
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  Verified
                </span>
              </CommandItem>
              <CommandItem
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    verified: "unverified",
                  }))
                }}
              >
                <RadioGroupItem
                  checked={filters.verified === "unverified"}
                  id="unverified"
                  value="unverified"
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  Unverified
                </span>
              </CommandItem>
            </RadioGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
