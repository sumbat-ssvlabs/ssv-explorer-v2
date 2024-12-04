"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { cn, toSentenceCase } from "@/lib/utils"
import { useColumnsVisibility } from "@/hooks/table/use-columns-visibility"
import { Button } from "@/components/ui/button"
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
import { defaultColumns } from "@/app/_components/operators/operators-table"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const { visibleColumnsCount } = useColumnsVisibility()
  const columns = table.getAllColumns().filter((column) => {
    return typeof column.accessorFn !== "undefined" && column.getCanHide()
  })

  const resetColumns = () => {
    columns.forEach((column) => {
      if (defaultColumns[column.id as keyof typeof defaultColumns]) {
        column.toggleVisibility(true)
      } else {
        column.toggleVisibility(false)
      }
    })
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="outline"
          role="combobox"
          size="sm"
          className="ml-auto flex h-8"
        >
          <Settings2 className="mr-2 size-4" />
          Customize Table
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[400px] overflow-auto p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-medium">Select Columns</p>
            <Button
              variant="ghost"
              className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-primary"
              onClick={resetColumns}
            >
              Reset
            </Button>
          </div>
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => {
                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                    disabled={
                      visibleColumnsCount === 1 && column.getIsVisible()
                    }
                    className="flex h-10 items-center space-x-2 px-2"
                  >
                    <Checkbox
                      id={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => {
                        column.toggleVisibility(!!checked)
                      }}
                      disabled={
                        visibleColumnsCount === 1 && column.getIsVisible()
                      }
                      className="mr-2"
                    />
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        column.getIsVisible()
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {toSentenceCase(column.id)}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
