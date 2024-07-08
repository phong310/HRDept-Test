import {
    CaretSortIcon
} from "@radix-ui/react-icons"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Box, Flex, Grid, IconButton, Text } from "@radix-ui/themes"
import "../css/tableData.css"
import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { DialogDelete } from "./DialogDelete"
import DialogCommon from "./DialogCommon"




export function TableData({ data, setIsFetching, isFetching }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [itemUser, setItemUser] = React.useState()
    const [isEdit, setIsEdit] = React.useState(false)

    const handleDelete = (item) => {
        setItemUser(item);
        setOpenDelete(true)
    }

    const handleUpdate = (item) => {
        setItemUser(item);
        setOpenUpdate(true);
        setIsEdit(true)
    }

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "stt",
            header: "STT",
            cell: ({ row }) => row.index + 1,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "firstname",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        First Name
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
        },
        {
            accessorKey: "lastname",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Last Name
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
        },
        {
            accessorKey: "role",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Role
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("role")}</div>,
        },
        {
            id: "actions",
            header: () => <Text>Actions</Text>,
            cell: ({ row }) => {
                return (
                    <Flex items="center" gap="2">
                        <IconButton color="gray" variant="solid" highContrast onClick={() => handleDelete(row.original)}>
                            <TrashIcon />
                        </IconButton>
                        <IconButton color="gray" variant="solid" highContrast onClick={() => handleUpdate(row.original)}>
                            <Pencil1Icon />
                        </IconButton>
                    </Flex>
                )
            },
            enableSorting: false,
            enableHiding: false,
        },
    ]


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <Grid width="full">
            <Box style={{ border: '1px solid gray', borderRadius: 10, padding: 30 }} className="rounded-md border">
                <Table className="table-spacing">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isEmailColumn = header.column.id === "email";
                                    return (
                                        <TableHead key={header.id} className={isEmailColumn ? "email-column" : ""}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const isEmailColumn = cell.column.id === "email";
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                style={{ padding: 10 }}
                                                className={`table-cell-padding ${isEmailColumn ? "email-column" : ""}`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            <Flex align="center" justify="between" gap="4" py="4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <Flex gap="2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <DialogDelete 
                open={openDelete} 
                onOpenChange={setOpenDelete} 
                itemUser={itemUser} 
                setIsFetching={setIsFetching} 
                isFetching={isFetching} 
            />
            <DialogCommon
                open={openUpdate}
                onOpenChange={setOpenUpdate}
                itemUser={itemUser}
                setIsFetching={setIsFetching}
                isFetching={isFetching} 
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            />
        </Grid>
    )
}
