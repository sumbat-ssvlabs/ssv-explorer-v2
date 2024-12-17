import { activeVerifiedOperator } from "@/mock/mock-operator"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { OperatorCard } from "@/components/operators/operator-card"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  params: Promise<{ publicKey: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { publicKey } = await props.params

  const length = 13
  return (
    <Shell className="gap-2">
      <Text>Validator Page</Text>
      <Text>{publicKey}</Text>
      <div
        className={cn("flex flex-wrap justify-center gap-6 [&>*]:min-w-32", {
          "[&>*]:flex-1": length < 8,
        })}
      >
        {Array.from({ length }).map((_, index) => {
          const isActive = Math.random() > 0.5 ? 1 : 0
          const performance = {
            "24h": isActive ? 99.99 : 0,
            "30d": isActive ? 99.779 : Math.random() * 20,
          }
          return (
            <OperatorCard
              key={index}
              operator={{
                ...activeVerifiedOperator,
                is_active: isActive,
                performance,
                logo: `https://picsum.photos/64/64?random=${index}`,
              }}
            />
          )
        })}
      </div>
    </Shell>
  )
}
