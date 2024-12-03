"use client"

import { type Table } from "@tanstack/react-table"
import { parseAsString, useQueryState } from "nuqs"
import { useDebounce } from "react-use"

import { type Operator } from "@/types/api"
import { Input } from "@/components/ui/input"

export const Cmp = ({ table }: { table: Table<Operator> }) => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      history: "replace",
      shallow: false,
      throttleMs: 300,
    })
  )
  useDebounce(
    () => {
      table.resetPageIndex()
    },
    300,
    [search]
  )
  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}
