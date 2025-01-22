"use client"

/* eslint-disable @next/next/no-img-element */
import { type ComponentProps, type FC } from "react"
import { useTheme } from "next-themes"

export const Logo: FC<ComponentProps<"img">> = (props) => {
  const { resolvedTheme } = useTheme()
  return (
    <img
      src={
        resolvedTheme === "dark" ? "/images/logo-dark.svg" : "/images/logo.svg"
      }
      alt="Logo"
      {...props}
    />
  )
}
