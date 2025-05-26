import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        error: "bg-error-100 text-error-500",
        uncoloredError: "bg-gray-300 text-error-500",
        success: "bg-success-100 text-success-700",

        warning:
          "bg-yellow-500/30 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-200",
        info: "bg-gray-300 text-gray-600",
        primary: "bg-primary-50 text-primary-500",
        unstyled: "text-gray-500",
        "multi-select": "bg-gray-300",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "default",
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"
