import { Task } from "@/db/schema"
import type { ExtendedSortingState, Filter, Prettify } from "@/types"
import { type Row } from "@tanstack/react-table"
import { createParser, parseAsStringEnum } from "nuqs/server"
import { z } from "zod"

import { dataTableConfig } from "@/config/data-table"

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export const getSortingStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<ExtendedSortingState<TData>>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(sortingItemSchema).safeParse(parsed)

        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null
        }

        return result.data as ExtendedSortingState<TData>
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  })
}

export const zStringNumber = z.string({ coerce: true }).transform((val) => {
  const parsed = parseFloat(val)
  if (isNaN(parsed)) {
    throw new Error("Invalid number")
  }
  return parsed
})

export const parseAsTuple = <T extends [z.ZodTypeAny, ...z.ZodTypeAny[]]>(
  tuple: T,
  map: (values: string[]) => string[] = (values) => values
) => {
  return createParser({
    parse: (value) => {
      try {
        const values = map(value.split(",").slice(0, tuple.length))
        return z.tuple(tuple).parse(values)
      } catch {
        return null
      }
    },
    serialize: (value) => value.join(","),
    eq: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  })
}

export const parseAsNumberEnum = (enumValues: number[]) => {
  return createParser({
    parse: (value) => {
      if (!value) return null
      const parsed = parseInt(value)
      if (isNaN(parsed)) return null
      if (!enumValues.includes(parsed)) return null
      return parsed
    },
    serialize: (value) => value.toString(),
    eq: (a, b) => a === b,
  })
}

export const filterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  type: z.enum(dataTableConfig.columnTypes),
  operator: z.enum(dataTableConfig.globalOperators),
  rowId: z.string(),
})

/**
 * Create a parser for data table filters.
 * @param originalRow The original row data to create the parser for.
 * @returns A parser for data table filters state.
 */
export const getFiltersStateParser = <T>(originalRow?: Row<T>["original"]) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<Filter<T>[]>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(filterSchema).safeParse(parsed)

        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null
        }

        return result.data as Filter<T>[]
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (filter, index) =>
          filter.id === b[index]?.id &&
          filter.value === b[index]?.value &&
          filter.type === b[index]?.type &&
          filter.operator === b[index]?.operator
      ),
  })
}
