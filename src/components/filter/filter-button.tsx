import { type ComponentPropsWithoutRef, type FC, type RefObject } from "react"
import { type PopoverProps } from "@radix-ui/react-popover"
import { X } from "lucide-react"
import { GoTriangleDown } from "react-icons/go"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Text } from "../ui/text"

type FilterButtonProps = {
  ref?: RefObject<HTMLButtonElement>
  isActive?: boolean
  activeFiltersCount?: number
  name: string
  popoverProps?: Omit<PopoverProps, "children">
  onClear?: () => void
}
export const FilterButton: FC<
  FilterButtonProps & ComponentPropsWithoutRef<"button">
> = ({
  ref,
  name,
  isActive,
  activeFiltersCount,
  popoverProps = {},
  onClear,
  children,
  ...props
}) => {
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger asChild>
        <button
          {...props}
          className={cn(
            "group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            {
              "bg-gray-100 pl-[16px] pr-2": !activeFiltersCount,
              "bg-primary-100 px-2": activeFiltersCount,
              "bg-primary-100": isActive,
            }
          )}
        >
          {Boolean(activeFiltersCount) && (
            <div className="rounded-md bg-primary-50 px-2 py-[2px]">
              <Text variant="body-3-semibold" className="text-primary-500">
                {activeFiltersCount}
              </Text>
            </div>
          )}
          <Text
            variant="body-3-medium"
            className={cn({
              "text-primary-500": true || isActive || activeFiltersCount,
            })}
          >
            {name}
          </Text>
          <div className="flex">
            <div className="flex size-6 items-center justify-center">
              <GoTriangleDown className="sFGize-4 text-gray-500 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-500" />
            </div>
            {Boolean(activeFiltersCount || isActive) && (
              <Button
                onClick={(event) => {
                  event.stopPropagation()
                  onClear?.()
                }}
                variant="ghost"
                size="icon"
                className="flex size-6 items-center justify-center rounded-md hover:bg-primary-50"
              >
                <X className="size-4 text-gray-500" />
              </Button>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit overflow-auto p-0">
        {children}
      </PopoverContent>
    </Popover>
  )
}
