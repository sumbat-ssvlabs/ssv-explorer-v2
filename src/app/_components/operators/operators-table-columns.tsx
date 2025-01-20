"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Operator } from "@/types/api"
import { getYearlyFee } from "@/lib/utils/operator"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { CopyBtn } from "@/components/ui/copy-btn"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { MevRelaysDisplay } from "@/components/mev-relays-display"
import { OperatorInfo } from "@/components/operators/operator-info"
import { OperatorPerformanceTooltip } from "@/components/operators/operator-performance-tooltip"
import { OperatorStatusBadge } from "@/components/operators/operator-status-badge"
import { PerformanceText } from "@/components/operators/performance-text"

export const operatorsTableColumns: ColumnDef<Operator>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-4">{row.getValue("id")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <OperatorInfo variant="minimal" operator={row.original} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "owner_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => {
      const ownerAddress = row.original.owner_address
      return (
        <div className="flex gap-1">
          <Button asChild variant="link">
            <Link href={`/account/${ownerAddress}`} className="font-mono">
              {shortenAddress(ownerAddress)}
            </Link>
          </Button>
          <CopyBtn className="text-gray-500" text={ownerAddress} />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.getValue("location")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "eth1_node_client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eth1 Node Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("eth1_node_client")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "eth2_node_client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eth2 Node Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("eth2_node_client")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "fee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee" />
    ),
    cell: ({ row }) => (
      <div>{getYearlyFee(BigInt(row.getValue("fee")), { format: true })}</div>
    ),
  },
  {
    accessorKey: "validators_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators Count" />
    ),
    cell: ({ row }) => <div>{row.getValue("validators_count")}</div>,
  },
  {
    accessorKey: "performance.24h",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-end"
        column={column}
        title="24h"
      />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["24h"]
      return (
        <OperatorPerformanceTooltip>
          <PerformanceText className="text-right" performance={performance} />
        </OperatorPerformanceTooltip>
      )
    },
  },
  {
    accessorKey: "performance.30d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="30d" />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["30d"]
      return (
        <OperatorPerformanceTooltip>
          <PerformanceText className="text-right" performance={performance} />
        </OperatorPerformanceTooltip>
      )
    },
  },
  {
    accessorKey: "mev_relays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MEV Relays" />
    ),
    cell: ({ row }) => {
      return <MevRelaysDisplay mevRelays={row.original.mev_relays} />
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return <OperatorStatusBadge size="sm" status={status} />
    },
  },
]

export const operatorsTablePreviewColumns = operatorsTableColumns.filter(
  (column) =>
    ["name", "owner_address", "performance.24h", "status"].includes(
      // @ts-expect-error accessorKey is not defined in the type
      column.accessorKey
    )
)
