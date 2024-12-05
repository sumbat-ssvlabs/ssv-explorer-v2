import { type ReadonlyURLSearchParams } from "next/navigation"
import { type inferParserType, type ParserBuilder } from "nuqs"

export const parseSearchParams = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Parsers extends Record<string, ParserBuilder<any>>,
>(
  searchParams: ReadonlyURLSearchParams,
  parsers: Parsers
) => {
  return Object.fromEntries(
    Object.entries(parsers).map(([key, parser]) => {
      const defaultValue =
        "defaultValue" in parser ? parser.defaultValue : undefined
      console.log("defaultValue:", defaultValue)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsed = parser.parse(searchParams.get(key) ?? undefined)
      console.log("parsed:", parsed)
      return [key, parsed]
    })
  ) as keyof Parsers extends infer T extends keyof Parsers
    ? { readonly [K in T]: inferParserType<Parsers[K]> }
    : never
}
