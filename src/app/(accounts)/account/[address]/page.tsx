import { type Address } from "viem"

import { type PageProps } from "@/types/page"
import { Shell } from "@/components/shell"

export default async function IndexPage(
  props: PageProps<{ address: Address }>
) {
  const params = await props.params
  return (
    <Shell className="gap-2">
      <div>Account Page</div>
      <div>{params.address}</div>
    </Shell>
  )
}
