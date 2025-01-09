import { type UseInfiniteQueryResult } from "@tanstack/react-query"
import { MdOutlineLock } from "react-icons/md"

import { type Operator } from "@/types/api"
import { Button } from "@/components/ui/button"
import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"

interface OperatorsGroupProps {
  query: UseInfiniteQueryResult<Operator[], unknown>
  onSelect: (group: "operator", value: Operator) => void
}

export function OperatorsGroup({ query, onSelect }: OperatorsGroupProps) {
  if (!query.data?.length && !query.hasNextPage) return null

  return (
    <CommandGroup>
      <Text variant="body-3-medium" className="text-gray-500">
        Operators
      </Text>
      {query.data?.map((operator) => (
        <CommandItem
          key={operator.id}
          value={operator.id.toString()}
          onSelect={() => {
            onSelect("operator", operator)
          }}
        >
          <div className="flex min-w-80 items-center gap-2">
            <OperatorAvatar src={operator.logo} />
            <Text>{operator.name}</Text>
            <div className="flex items-center gap-1">
              {operator.is_private && <MdOutlineLock className="size-[14px]" />}
              {operator.verified_operator && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="size-[14px]"
                  src="/images/verified.svg"
                  alt="Verified"
                />
              )}
            </div>
          </div>
        </CommandItem>
      ))}
      {query.hasNextPage && (
        <div className="mt-1 flex w-full justify-center">
          <Button
            size="sm"
            className="w-full"
            variant="ghost"
            isLoading={query.isFetching}
            onClick={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              query.fetchNextPage()
            }}
          >
            {query.isFetching ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </CommandGroup>
  )
}
