import { activeVerifiedOperator } from "@/mock/mock-operator"

import { Text } from "@/components/ui/text"
import { OperatorsCardList } from "@/components/operators/operators-card-list"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  params: Promise<{ id: string }>
}

const lengths = [4, 7, 13]
export default async function IndexPage(props: IndexPageProps) {
  const { id } = await props.params

  const length = lengths[Math.floor(Math.random() * lengths.length)]!
  const operators = Array.from({ length }).map((_, index) => {
    const isActive = Math.random() > 0.5 ? 1 : 0
    const performance = {
      "24h": isActive ? 99.99 : 0,
      "30d": isActive ? 99.779 : Math.random() * 20,
    }
    return {
      ...activeVerifiedOperator,
      is_active: isActive,
      performance,
      logo: `https://picsum.photos/64/64?random=${index}`,
    }
  })
  return (
    <Shell className="gap-2">
      <Text>Cluster Page</Text>
      <Text>{id}</Text>
      <OperatorsCardList operators={operators} />
    </Shell>
  )
}
