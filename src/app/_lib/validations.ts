import { tasks, type Task } from "@/db/schema"
import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"
import { isAddress } from "viem"
import * as z from "zod"

import {
  getFiltersStateParser,
  getSortingStateParser,
  parseAsNumberEnum,
  parseAsTuple,
  zStringNumber,
} from "@/lib/utils/parsers"
import { networks } from "@/lib/utils/ssv-network-details"

export const searchParamsCache = createSearchParamsCache({
  flags: parseAsArrayOf(z.enum(["advancedTable", "floatingBar"])).withDefault(
    []
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Task>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  title: parseAsString.withDefault(""),
  status: parseAsArrayOf(z.enum(tasks.status.enumValues)).withDefault([]),
  priority: parseAsArrayOf(z.enum(tasks.priority.enumValues)).withDefault([]),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
})

export const operatorsSearchParamsCache = createSearchParamsCache({
  chain: parseAsNumberEnum(networks.map((n) => n.networkId)).withDefault(
    networks[0]!.networkId
  ),
  search: parseAsString.withDefault(""),
  id: parseAsArrayOf(z.number({ coerce: true })).withDefault([]),
  name: parseAsArrayOf(z.string()).withDefault([]),
  owner: parseAsArrayOf(z.string().refine(isAddress)).withDefault([]),
  location: parseAsArrayOf(z.string()).withDefault([]),
  eth1: parseAsArrayOf(z.string()).withDefault([]),
  eth2: parseAsArrayOf(z.string()).withDefault([]),
  mev: parseAsArrayOf(z.string()).withDefault([]),
  fee: parseAsTuple(
    [z.bigint({ coerce: true }), z.bigint({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  ).withDefault([-1n, -1n]),
  validators: parseAsArrayOf(z.tuple([z.string(), z.string()])).withDefault([]),
  performance_24h: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withDefault([]),
  performance_30d: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withDefault([]),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Task>().withDefault([
    { id: "createdAt", desc: true },
  ]),
})

export const createTaskSchema = z.object({
  title: z.string(),
  label: z.enum(tasks.label.enumValues),
  status: z.enum(tasks.status.enumValues),
  priority: z.enum(tasks.priority.enumValues),
})

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  label: z.enum(tasks.label.enumValues).optional(),
  status: z.enum(tasks.status.enumValues).optional(),
  priority: z.enum(tasks.priority.enumValues).optional(),
})

export type OperatorsSearchSchema = Awaited<
  ReturnType<typeof operatorsSearchParamsCache.parse>
>
export type GetTasksSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
