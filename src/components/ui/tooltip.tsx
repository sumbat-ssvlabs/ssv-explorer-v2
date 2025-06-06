import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { useEffectOnce } from "react-use"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipArrow = TooltipPrimitive.Arrow

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        "shadcn-tooltip z-50 max-w-md overflow-hidden rounded-md bg-gray-700 px-4 py-2.5 text-sm font-medium text-gray-50 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-300 dark:text-gray-800",
        className
      )}
      style={{
        fontWeight: 400,
      }}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    "content"
  > {
  children: React.ReactNode
  content?: React.ReactNode
  hasArrow?: boolean
  delayDuration?: number
  open?: TooltipPrimitive.TooltipProps["open"]
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  asChild,
  delayDuration,
  content,
  open,
  hasArrow,
  className,
  ...props
}) => {
  if (!content) return children
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={delayDuration || 300} open={open}>
        <TooltipTrigger asChild={asChild} type="button">
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "rounded-2xl border border-gray-300 bg-gray-50 text-gray-800 outline outline-[6px] outline-gray-200",
            "dark:border-white/10 dark:bg-gray-50 dark:outline-gray-100",
            className
          )}
          {...props}
        >
          {hasArrow && <TooltipArrow className="fill-gray-700" />}
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export const useIsInsideTooltip = () => {
  const ref = React.useRef<HTMLElement>(null)
  const [isInsideTooltip, setIsInsideTooltip] = React.useState(false)

  useEffectOnce(() => {
    let currentElement = ref.current
    while (currentElement) {
      if (currentElement.classList.contains("shadcn-tooltip")) {
        setIsInsideTooltip(true)
        return
      }
      currentElement = currentElement.parentElement
    }
  })

  return {
    ref,
    isInsideTooltip,
  }
}

export {
  Tooltip,
  TooltipRoot,
  TooltipArrow,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
