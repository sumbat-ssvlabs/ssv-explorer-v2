import { type ComponentPropsWithoutRef, type FC } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { MEV_RELAYS_LOGOS } from "@/lib/utils/operator"
import { Tooltip } from "@/components/ui/tooltip"

export type MevRelaysDisplayProps = {
  mevRelays: string
}

type MevRelaysDisplayFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof MevRelaysDisplayProps> &
    MevRelaysDisplayProps
>

export const MevRelaysDisplay: MevRelaysDisplayFC = ({
  mevRelays,
  className,
  ...props
}) => {
  const { theme } = useTheme()
  const dark = theme === "dark"
  return (
    <div className={cn("flex gap-0.5", className)} {...props}>
      {Object.entries(MEV_RELAYS_LOGOS).map(([mev, logo]) => {
        const isSelected = mevRelays.includes(mev)
        return (
          <Tooltip
            key={mev}
            content={
              <div className="flex items-center gap-3">
                <img
                  src={`/images/mevs/${logo}${"-dark"}.svg`}
                  className={cn("size-10")}
                  alt={mev}
                />
                {mev}
              </div>
            }
          >
            <div
              key={mev}
              className={cn(
                "flex size-[14px] items-center justify-center rounded-sm border border-transparent bg-gray-200",
                {
                  "border-primary-500 bg-primary-50": isSelected,
                  "opacity-60": !isSelected,
                }
              )}
            >
              <img
                src={`/images/mevs/${logo}${dark ? "-dark" : ""}.svg`}
                className={cn("size-[8px]")}
                alt={mev}
              />
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}

MevRelaysDisplay.displayName = "MevRelaysDisplay"
