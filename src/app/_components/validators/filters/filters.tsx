import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { cn } from "@/lib/utils"
import { CreateAtFilter } from "@/app/_components/validators/filters/create-at-filter"

export const Filters = () => {
  const { isFiltersOpen } = useTable()
  return (
    <Collapse isOpened={isFiltersOpen}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 overflow-hidden border-t border-gray-300 py-2 transition-opacity duration-300",
          {
            "opacity-100": isFiltersOpen,
            "invisible opacity-0": !isFiltersOpen,
          }
        )}
        aria-hidden={!isFiltersOpen}
      >
        <CreateAtFilter />
      </div>
    </Collapse>
  )
}
