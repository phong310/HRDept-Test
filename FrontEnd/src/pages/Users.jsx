import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import DialogCommon from "@/Layout/DialogCommon";
import { TableData } from "@/Layout/TableData";
import { MagnifyingGlassIcon, ResetIcon, DownloadIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Users() {
    const [data, setData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchFirstname, setSearchFirstname] = useState("");
    const [searchRole, setSearchRole] = useState("");
    const [selectKey, setSelectKey] = useState(Date.now());
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const [isFetching, setIsFetching] = useState(false);

    const getAllData = async () => {
        try {
            const res = await axios.get(`${baseURL}user-managerment/get-all`);
            setData(res.data);
        } catch (e) {
            console.log("Err:", e);
        }
    };

    const searchUser = async () => {
        try {
            const res = await axios.get(`${baseURL}user-managerment/search`, {
                params: {
                    firstname: searchFirstname,
                    role: searchRole
                }
            });
            setData(res.data);
        } catch (e) {
            console.log("Err:", e);
        }
    };

    const resetSearch = async () => {
        setSearchFirstname("");
        setSearchRole("");
        setSelectKey(Date.now());
        getAllData();
    };

    // Xuất file Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "data.xlsx");
    };

    const handleSelectValue = (value) => {
        setSearchRole(value);
    };

    useEffect(() => {
        getAllData();
    }, [isFetching]);

    return (
        <>
            <Box style={{ padding: "10px" }}>
                <Flex align="center" justify="between" style={{ flexWrap: "wrap", padding: "10px 0px 20px 0px" }}>
                    <Text size="5" weight="medium">User management</Text>
                    <Flex gap="2" style={{ flexWrap: "wrap", justifyContent: "center" }}>
                        <Button onClick={() => exportToExcel()}>
                            <DownloadIcon style={{ marginRight: 10 }} /> Export to Excel
                        </Button>
                        <Button onClick={() => setDialogOpen(true)}>
                            <PlusCircledIcon style={{ marginRight: 10 }} /> Add New User
                        </Button>
                    </Flex>
                </Flex>
                <Flex gap="4" pb="8" style={{ flexWrap: "wrap" }} maxWidth='900px'>
                    <Box style={{ flex: "1 1 20px", minWidth: "200px" }}>
                        <Input
                            type="text"
                            placeholder="Search firstname..."
                            value={searchFirstname}
                            onChange={(e) => setSearchFirstname(e.target.value)}
                        />
                    </Box>
                    <Box style={{ flex: "1 1 20px", minWidth: "200px" }}>
                        <Select key={selectKey} onValueChange={handleSelectValue}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Box>
                    <Button onClick={() => searchUser()} style={{ flex: "1 1 10px", maxWidth: "150px" }}>
                        <MagnifyingGlassIcon style={{ marginRight: 10 }} /> Search
                    </Button>
                    <Button onClick={() => resetSearch()} style={{ flex: "1 1 10px", maxWidth: "150px" }}>
                        <ResetIcon style={{ marginRight: 10 }} /> Reset
                    </Button>
                </Flex>
                <Box style={{ maxWidth: "100%", overflowX: "auto" }}>
                    <TableData data={data} setIsFetching={setIsFetching} isFetching={isFetching} />
                </Box>
            </Box>
            <DialogCommon open={dialogOpen} onOpenChange={setDialogOpen} setIsFetching={setIsFetching} isFetching={isFetching} />
        </>
    );
}
