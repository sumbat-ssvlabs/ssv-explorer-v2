"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/layouts/mode-toggle"

import { Input } from "../ui/input"
import { Text } from "../ui/text"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme } = useTheme()

  return (
    <header className="container w-full backdrop-blur">
      <div className="flex h-[60px] items-center border-b border-gray-300 font-mono">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <Image
            src={
              theme === "dark" ? "/images/logo-dark.svg" : "/images/logo.svg"
            }
            alt="Logo"
            width={140}
            height={28}
          />
        </Link>

        <nav className="flex flex-1 items-center md:justify-end">
          <ModeToggle />
        </nav>
      </div>
      <div className="flex h-[60px] items-center justify-between gap-6">
        <div className="flex gap-6">
          <Text
            as={Link}
            variant="body-3-medium"
            href="/overview"
            className={cn({
              "text-primary-500": pathname === "/overview",
            })}
          >
            Overview
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/operators"
            className={cn({
              "text-primary-500": pathname === "/operators",
            })}
          >
            Operators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/validators"
            className={cn({
              "text-primary-500": pathname === "/validators",
            })}
          >
            Validators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/clusters"
            className={cn({
              "text-primary-500": pathname === "/clusters",
            })}
          >
            Clusters
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/accounts"
            className={cn({
              "text-primary-500": pathname === "/accounts",
            })}
          >
            Accounts
          </Text>
        </div>
        <Input
          placeholder="Search"
          className="h-[40px] w-[600px] bg-gray-100"
        />
      </div>
    </header>
  )
}
