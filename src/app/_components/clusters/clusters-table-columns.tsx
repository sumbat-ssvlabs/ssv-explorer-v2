"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Cluster } from "@/types/api"
import { formatSSV } from "@/lib/utils/number"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { OperatorAvatar } from "@/components/operators/operator-avatar"

export const clustersTableColumns: ColumnDef<Cluster>[] = [
  {
    accessorKey: "clusterId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={`/cluster/${row.original.clusterId}`}
        >
          <div>{shortenAddress(remove0x(row.original.clusterId))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.clusterId} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ownerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={`/account/${row.original.ownerAddress}`}
        >
          <div>{shortenAddress(row.original.ownerAddress)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.ownerAddress} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "operators",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operators" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.operators.map((operator) => {
          return (
            <Link href={`/operator/${operator.id}`} key={operator.id}>
              <OperatorAvatar
                size="base"
                src={operator.logo}
                isPrivate={operator.isPrivate}
              />
            </Link>
          )
        })}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => <div>{formatSSV(BigInt(row.original.balance))} SSV</div>,
  },
  {
    accessorKey: "validatorCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator Count" />
    ),
    cell: ({ row }) => <div>{row.original.validatorCount}</div>,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => <div>{row.original.active ? "Yes" : "No"}</div>,
  },
]
