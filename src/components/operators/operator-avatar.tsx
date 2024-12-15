import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { MdOutlineLock } from "react-icons/md"

import { cn } from "@/lib/utils"

export const variants = cva("object-cover", {
  variants: {
    variant: {
      circle: "rounded-full",
      square: "rounded-lg border border-gray-400 bg-gray-200",
    },

    size: {
      sm: "size-6",
      md: "size-7",
      lg: "size-12",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "square",
  },
})

export type OperatorAvatarProps = {
  src?: string
  isPrivate?: boolean
}

type FCProps = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof OperatorAvatarProps
> &
  OperatorAvatarProps &
  VariantProps<typeof variants>

export const OperatorAvatar = forwardRef<HTMLDivElement, FCProps>(
  ({ src, className, isPrivate, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variants({ size, variant, className }),
          "relative aspect-square select-none bg-cover bg-center"
        )}
        style={{
          backgroundImage: `url(${src || "/images/operator-avatar.svg"})`,
        }}
        {...props}
      >
        {isPrivate && (
          <div className="absolute right-0 top-1/2 w-fit rounded-sm bg-gray-50">
            <MdOutlineLock className="size-3 stroke-gray-50" />
          </div>
        )}
      </div>
    )
  }
)

OperatorAvatar.displayName = "OperatorAvatar"
