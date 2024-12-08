import { type ComponentPropsWithRef, type FC, type RefObject } from "react"

import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"

type PerformanceTextProps = {
  performance: number
}

const getColor = (performance: number) => {
  if (performance > 99) return "text-[#06B64F]"
  if (performance > 96) return "text-[#7ED90B]"
  if (performance > 90) return "text-[#FD9D2F]"
  if (performance > 0) return "text-[#EC1C26]"
  if (performance === 0) return "text-gray-500 text-xs"
}

export const PerformanceText: FC<
  PerformanceTextProps & ComponentPropsWithRef<"div">
> = ({ performance, ref, className, ...props }) => {
  return (
    <div
      ref={ref}
      className={cn(getColor(performance), "font-medium", className)}
      {...props}
    >
      {percentageFormatter.format(performance)}
    </div>
  )
}
