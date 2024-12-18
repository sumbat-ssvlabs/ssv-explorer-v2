import type { ComponentPropsWithRef, FC, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { FaInfoCircle } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"

export type StatProps = {
  title: string
  content: ReactNode
  tooltip?: ReactNode
}

type StatFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof StatProps> & StatProps
>

export const Stat: StatFC = ({
  className,
  title,
  tooltip,
  content,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      <Tooltip content={tooltip}>
        <div className="flex items-center gap-1">
          <Text variant="caption-medium" className="text-gray-500">
            {title}
          </Text>
          {tooltip && <FaInfoCircle className="size-3 text-gray-500" />}
        </div>
      </Tooltip>
      <Slot className="text-xl font-bold">{content}</Slot>
    </div>
  )
}

Stat.displayName = "Stat"
