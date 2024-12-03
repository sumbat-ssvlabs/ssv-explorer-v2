"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { type Operator } from "@/types/api"
import { percentageFormatter } from "@/lib/utils/number"
import { getYearlyFee } from "@/lib/utils/operator"
import { shortenAddress } from "@/lib/utils/strings"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

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
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue("name")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "owner_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => (
      <div>{shortenAddress(row.getValue("owner_address"))}</div>
    ),
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
      <DataTableColumnHeader column={column} title="24h" />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["24h"]
      return <div>{percentageFormatter.format(performance)}</div>
    },
  },
  {
    accessorKey: "performance.30d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="30d" />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["30d"]
      return <div>{percentageFormatter.format(performance)}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return <div>{status}</div>
    },
  },
]
