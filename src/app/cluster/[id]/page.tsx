import Link from "next/link"
import { getCluster } from "@/api/clusters"
import { searchValidators } from "@/api/validators"

import {
  validatorsSearchParamsCache,
  type ValidatorsSearchSchema,
} from "@/lib/search-parsers/validators-search"
import { cn } from "@/lib/utils"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorCard } from "@/components/operators/operator-card"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ network: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { id } = await props.params
  const awaitedSearchParams = await props.searchParams
  const searchParams = validatorsSearchParamsCache.parse(
    awaitedSearchParams
  ) as ValidatorsSearchSchema

  const validators = searchValidators({
    ...searchParams,
    clusterId: id,
  })

  const cluster = await getCluster({ id, network: searchParams.network }).catch(
    (error) => {
      console.error(error)
      return null
    }
  )

  if (!cluster) {
    return <div>Cluster not found</div>
  }

  return (
    <Shell className="gap-6">
      <Card>
        <Text variant="headline4">Cluster</Text>
        <div className="flex gap-1">
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              ID:
            </Text>
            <Text variant="body-3-medium">
              {shortenAddress(remove0x(cluster.clusterId))}
            </Text>
            <CopyBtn text={cluster.clusterId} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Owner:
            </Text>
            <Button
              as={Link}
              href={`/account/${cluster.ownerAddress}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(cluster.ownerAddress)}
            </Button>
            <CopyBtn text={cluster.ownerAddress} />
          </Outline>
        </div>
        <div className="flex items-center gap-6 align-sub">
          <Stat
            className="flex-1"
            title="Status"
            tooltip="Whatsup?"
            content={
              <Text className="text-success-700">
                {cluster.active ? "Active" : "Inactive"}
              </Text>
            }
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title="Performance (1D | 1M)"
            tooltip="Whatsup?"
            content={
              <Text className="text-success-700">{cluster.blockNumber}</Text>
            }
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title="Validators"
            tooltip="Whatsup?"
            content={<Text>{cluster.active ? "Active" : "Inactive"}</Text>}
          />
        </div>
      </Card>
      <div
        className={cn("flex flex-wrap justify-center gap-6 [&>*]:min-w-32", {
          "[&>*]:flex-1": cluster.operators.length < 8,
        })}
      >
        {cluster.operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
      <Card>
        <ValidatorsTable dataPromise={validators} />
      </Card>
    </Shell>
  )
}
