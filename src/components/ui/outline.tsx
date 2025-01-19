import type { ComponentPropsWithRef, FC } from "react"

import { cn } from "@/lib/utils"

export const Outline: FC<ComponentPropsWithRef<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded-md border border-gray-200 px-2 py-[2px] dark:border-white/[0.03]",
        className
      )}
      {...props}
    />
  )
}

Outline.displayName = "Outline"
