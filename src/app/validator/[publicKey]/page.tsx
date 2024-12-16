import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  params: Promise<{ publicKey: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { publicKey } = await props.params

  return (
    <Shell className="gap-2">
      <Text>Validator Page</Text>
      <Text>{publicKey}</Text>
    </Shell>
  )
}
