"use client"

import { use, useState } from "react"
import { searchOperators } from "@/api/operator"

import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function IdFilter(props: ButtonProps) {
  const [search, setSearch] = useState<string>("")
  const { operators } = use(
    searchOperators({ search, perPage: 10, chain: 17000 })
  )
  console.log("operators:", operators)
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button {...props}>ID</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[400px] overflow-auto p-0">
        <Command>
          <CommandInput placeholder={"Search Ids"} />
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup></CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
