"use client"

import * as React from "react"

import { useAsyncRoutePush } from "@/hooks/next/use-async-route-push"
import { useClustersInfiniteQuery } from "@/hooks/queries/use-clusters-infinite-query"
import { useOperatorsInfiniteQuery } from "@/hooks/queries/use-operators-infinite-query"
import { useValidatorsInfiniteQuery } from "@/hooks/queries/use-validators-infinite-query"
import { useDebounceValue } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import { Text } from "@/components/ui/text"

import { ClustersGroup } from "./groups/clusters-group"
import { OperatorsGroup } from "./groups/operators-group"
import { ValidatorsGroup } from "./groups/validators-group"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const debouncedValue = useDebounceValue(value, 500)

  const asyncRoutePush = useAsyncRoutePush()

  const operatorsQuery = useOperatorsInfiniteQuery({
    search: debouncedValue,
    perPage: 5,
  })

  const validatorsQuery = useValidatorsInfiniteQuery({
    search: debouncedValue,
    perPage: 5,
  })

  const clustersQuery = useClustersInfiniteQuery({
    search: debouncedValue,
    perPage: 5,
  })

  const isLoading =
    operatorsQuery.isLoading ||
    validatorsQuery.isLoading ||
    clustersQuery.isLoading

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] max-w-full justify-between"
        >
          <Text variant="body-3-medium" className="text-gray-500">
            Search operator ID or name, validator public key, cluster ID or
            account address
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] max-w-full p-0">
        <Command className="flex flex-col gap-6 p-2" shouldFilter={false}>
          <CommandInput
            placeholder="Search framework..."
            value={value}
            onValueChange={(value) => setValue(value)}
          />
          <CommandList className="relative flex flex-col gap-6 p-0">
            {!isLoading && value && <CommandEmpty>No found.</CommandEmpty>}
            {isLoading && (
              <div className="flex items-center justify-center p-6">
                <Spinner />
              </div>
            )}
            {!isLoading && (
              <>
                <OperatorsGroup
                  query={operatorsQuery}
                  onSelect={(group, operator) => {
                    setOpen(false)
                    asyncRoutePush.mutate(`/operator/${operator.id}`)
                  }}
                />
                <CommandSeparator />
                <ValidatorsGroup
                  query={validatorsQuery}
                  onSelect={(group, validator) => {
                    setOpen(false)
                    asyncRoutePush.mutate(`/validator/${validator.public_key}`)
                  }}
                />
                <CommandSeparator />
                <ClustersGroup
                  query={clustersQuery}
                  onSelect={(group, cluster) => {
                    setOpen(false)
                    asyncRoutePush.mutate(`/cluster/${cluster.clusterId}`)
                  }}
                />
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
