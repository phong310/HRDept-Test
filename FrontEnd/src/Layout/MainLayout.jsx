import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from '@/pages/Users';
import { Box } from '@radix-ui/themes';
import SideBar from './SideBar';
import '@/css/mainLayout.css';

export default function MainLayout() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Box className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Routes>
                    <Route path="user-managerment" element={<Users />} />
                </Routes>
            </Box>
        </>
    );
}
