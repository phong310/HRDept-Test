import DialogCommon from '@/Layout/DialogCommon'
import { TableData } from '@/Layout/TableData'
import { MagnifyingGlassIcon, ResetIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Select, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Users() {
    const [data, setData] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const [isFetching, setIsFetching] = useState(false)


    const getAllData = async () => {
        try {
            const res = await axios.get(`${baseURL}user-managerment/get-all`);
            setData(res.data)
        } catch (e) {
            console.log('Err:', e);
        }
    }

    useEffect(() => {
        getAllData()
    }, [isFetching])


    return (
        <>
            <Box>
                <Flex align="center" justify="between" maxWidth="1540px" style={{ padding: '10px 0px 20px 0px' }}>
                    <Text size="5" weight="medium">User managerment</Text>
                    <Flex gap="4">
                        <Button size="3" color="gray" variant="solid" highContrast>Export to Excel</Button>
                        <Button size="3" color="gray" variant="solid" highContrast onClick={() => setDialogOpen(true)}>Add New User</Button>
                    </Flex>
                </Flex>
                <Flex gap="4" pb="8">
                    <TextField.Root placeholder="Search user..." size="3" />
                    <Select.Root defaultValue="admin" size="3">
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="user">User</Select.Item>
                                <Select.Item value="manager">Manager</Select.Item>
                                <Select.Item value="admin">Admin</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                    <Button size="3" color="gray" variant="solid" highContrast><MagnifyingGlassIcon />Search</Button>
                    <Button size="3" color="gray" variant="solid" highContrast><ResetIcon />Reset</Button>
                </Flex>
                <Box maxWidth="1540px">
                    <TableData data={data} setIsFetching={setIsFetching} isFetching={isFetching} />
                </Box>
            </Box>
            <DialogCommon open={dialogOpen} onOpenChange={setDialogOpen} setIsFetching={setIsFetching} isFetching={isFetching} />
        </>
    )
}
