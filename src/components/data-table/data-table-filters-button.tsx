"use client"

import { useTable } from "@/context/table-context"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Badge } from "../ui/badge"
import { Tooltip } from "../ui/tooltip"

interface DataTableFiltersButtonProps {
  enabledFilters: {
    count: number
    names: string[]
  }
}

export function DataTableFiltersButton({
  enabledFilters,
}: DataTableFiltersButtonProps) {
  const { setIsFiltersOpen } = useTable()
  return (
    <Button
      aria-label="Toggle columns"
      variant="outline"
      role="combobox"
      size="sm"
      className="ml-auto flex h-8"
      onClick={() => setIsFiltersOpen((prev) => !prev)}
    >
      <Settings2 className="mr-2 size-4" />
      Filters{" "}
      {enabledFilters.count > 0 && (
        <Tooltip
          asChild
          content={`Enabled filters: ${enabledFilters.names.join(", ")}`}
        >
          <Badge size="xs" variant="info">
            {enabledFilters.count}
          </Badge>
        </Tooltip>
      )}
    </Button>
  )
}
