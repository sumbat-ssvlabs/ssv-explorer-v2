"use client"

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
