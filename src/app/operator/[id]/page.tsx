import Image from "next/image"
import Link from "next/link"
import { getOperator } from "@/api/operator"
import { MdOutlineLock } from "react-icons/md"

import { networkParserCache } from "@/lib/search-parsers"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import PerformanceChart from "@/components/operators/charts/performance-chart"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { PerformanceText } from "@/components/operators/performance-text"
import { Shell } from "@/components/shell"
import { OperatorsTable } from "@/app/_components/operators/operators-table"

interface IndexPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ network: string }>
}

export default async function IndexPage(props: IndexPageProps) {
  const { id } = await props.params
  const serach = networkParserCache.parse(await props.searchParams)

  return (
    <Shell className="gap-2">
      {(async () => {
        try {
          const operator = await getOperator(serach.network, +id)
          return (
            <div className="flex flex-col gap-6">
              <Card>
                <div className="flex gap-[14px]">
                  <OperatorAvatar
                    size="xl"
                    variant="unstyled"
                    src={operator.logo}
                  />
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-2">
                      <Text variant="headline4">{operator.name}</Text>
                      <div className="flex items-center gap-[6px]">
                        {operator.is_private && (
                          <MdOutlineLock className="size-[18px] min-w-[18px]" />
                        )}
                        {operator.verified_operator && (
                          <Image
                            width={18}
                            height={18}
                            className="size-[18px]"
                            src="/images/verified.svg"
                            alt="Verified"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Outline>
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
                          ID:
                        </Text>
                        <Text variant="body-3-medium">{operator.id}</Text>
                      </Outline>
                      <Outline>
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
                          Owner:
                        </Text>
                        <Button
                          as={Link}
                          className="font-mono text-sm font-medium"
                          href={`/account/${operator.owner_address}`}
                          variant="link"
                        >
                          {shortenAddress(operator.owner_address)}
                        </Button>
                        <CopyBtn text={operator.owner_address} />
                      </Outline>
                      <Outline>
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
                          Owner:
                        </Text>
                        <Text
                          variant="body-3-medium"
                          className="max-w-28 overflow-hidden text-ellipsis font-mono"
                        >
                          {operator.public_key}
                        </Text>
                        <CopyBtn text={operator.public_key} />
                      </Outline>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 align-sub">
                  <Stat
                    className="flex-1"
                    title="Status"
                    tooltip="Whatsup?"
                    content={
                      <Text className="text-success-700">
                        {operator.status}
                      </Text>
                    }
                  />
                  <div className="h-full border-r border-gray-500" />
                  <Stat
                    className="flex-1"
                    title="Performance (1D | 1M)"
                    tooltip="Whatsup?"
                    content={
                      <div className="flex items-center gap-1">
                        <PerformanceText
                          performance={operator.performance["24h"]}
                        />
                        <Text className="font-thin text-gray-500">|</Text>
                        <PerformanceText
                          performance={operator.performance["30d"]}
                        />
                      </div>
                    }
                  />
                  <Stat
                    className="flex-1"
                    title="Validators"
                    tooltip="Whatsup?"
                    content={<Text>{operator.validators_count}</Text>}
                  />
                </div>
              </Card>
              <div className="flex gap-6 [&>*]:flex-1">
                <Card>
                  <Text variant="caption-medium" className="text-gray-500">
                    Avg. Performance
                  </Text>
                  <div className="h-[144px] w-full rounded-xl">
                    <PerformanceChart />
                  </div>
                </Card>
                <Card>
                  <Text variant="caption-medium" className="text-gray-500">
                    ETH Management Table
                  </Text>
                  <div className="h-[144px] w-full rounded-xl">
                    <PerformanceChart />
                  </div>
                </Card>
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
            </div>
          )
        } catch (error) {
          return <div>{(error as Error).message}</div>
        }
      })()}
    </Shell>
  )
}
