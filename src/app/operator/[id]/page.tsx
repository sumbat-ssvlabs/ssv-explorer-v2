import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  params: Promise<{ id: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { id } = await props.params

  return (
    <Shell className="gap-2">
      <Text>Operator Page</Text>
      <Text>{id}</Text>
    </Shell>
  )
}
