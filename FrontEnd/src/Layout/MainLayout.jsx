import React from 'react';
import SideBar from './SideBar';
import { Route, Routes } from 'react-router-dom';
import Users from '@/pages/Users';
import { Box } from '@radix-ui/themes';

export default function MainLayout() {
    return (
        <>
            <SideBar />
            <Box style={{ marginLeft: 260, marginTop: 20 }}>
                <Routes>
                    <Route path="user-managerment" element={<Users />} />
                </Routes>
            </Box>
        </>
    );
}
