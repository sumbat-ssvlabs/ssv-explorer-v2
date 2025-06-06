import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Spinner } from "./spinner"

export const inputVariants = cva(
  "invalid-within:border-error-500 flex h-12 w-full items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-4 font-medium placeholder:text-gray-300 focus-within:border-primary-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
)
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  isLoading?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, isLoading, leftSlot, rightSlot, inputProps, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          inputVariants(),
          {
            "pr-4": rightSlot,
          },
          className
        )}
      >
        <Slot>{isLoading ? <Spinner /> : leftSlot}</Slot>
        <input
          type={type}
          {...props}
          {...inputProps}
          className={cn(
            inputProps?.className,
            "size-full flex-1 bg-transparent outline-none"
          )}
          ref={ref}
        />
        <Slot>{rightSlot}</Slot>
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
