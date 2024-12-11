import Image from "next/image"
import Link from "next/link"

import { ModeToggle } from "@/components/layouts/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[60px] w-full border-b border-gray-300 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <Image src="/images/logo.svg" alt="Logo" width={140} height={28} />
        </Link>

        <nav className="flex flex-1 items-center md:justify-end">
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
