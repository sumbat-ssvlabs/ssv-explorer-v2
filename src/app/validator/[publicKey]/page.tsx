import Link from "next/link"
import { getValidator } from "@/api/validators"

import { networkParserCache } from "@/lib/search-parsers"
import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Outline } from "@/components/ui/outline"
import { BeaconchainBtn } from "@/components/ui/ssv-explorer-btn"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorCard } from "@/components/operators/operator-card"
import { Shell } from "@/components/shell"
import { OperatorsTable } from "@/app/_components/operators/operators-table"

interface IndexPageProps {
  params: Promise<{ publicKey: string }>
  searchParams: Promise<{ network: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { publicKey } = await props.params
  const { network } = networkParserCache.parse(await props.searchParams)

  const validator = await getValidator({ publicKey, network })

  return (
    <Shell className="gap-6">
      <Card>
        <Text variant="headline4">Validator</Text>
        <div className="flex gap-1">
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              ID:
            </Text>
            <Text variant="body-3-medium">{shortenAddress(publicKey)}</Text>
            <CopyBtn text={publicKey} />
            <BeaconchainBtn validatorId={publicKey} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Owner:
            </Text>
            <Button
              as={Link}
              href={`/account/${validator.owner_address}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(validator.owner_address)}
            </Button>
            <CopyBtn text={validator.owner_address} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Cluster:
            </Text>
            <Button
              as={Link}
              href={`/cluster/${validator.cluster}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(validator.cluster)}
            </Button>
            <CopyBtn text={validator.cluster} />
          </Outline>
        </div>
        <div className="flex items-center gap-6 align-sub">
          <Stat
            className="flex-1"
            title="Status"
            tooltip="Whatsup?"
            content={
              <Text className="text-success-700">{validator.status}</Text>
            }
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title="Performance (1D | 1M)"
            tooltip="Whatsup?"
            content={
              <Text className="text-success-700">
                {validator.validator_info.activation_epoch}
              </Text>
            }
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title="Validators"
            tooltip="Whatsup?"
            content={<Text>{validator.validator_info.status}</Text>}
          />
        </div>
      </Card>
      <div
        className={cn("flex flex-wrap justify-center gap-6 [&>*]:min-w-32", {
          "[&>*]:flex-1": validator.operators.length < 8,
        })}
      >
        {validator.operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
      <Card>
        <OperatorsTable
          dataPromise={Promise.resolve({
            operators: [],
            pagination: {
              page: 1,
              pages: 100,
              current_first: 1,
              current_last: 100,
              total: 100,
              per_page: 100,
            },
          })}
        />
      </Card>
    </Shell>
  )
}
