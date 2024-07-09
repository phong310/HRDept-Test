import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { HamburgerMenuIcon, PersonIcon, GlobeIcon, FileIcon, DashboardIcon } from '@radix-ui/react-icons';

import '../css/sidebar.css';
import Users from '@/pages/Users';
import Header from './Header';
import { Box, Button, Flex } from '@radix-ui/themes';

const sideBarMenu = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        component: ''
    },
    {
        label: 'User',
        path: '/user-managerment',
        icon: <PersonIcon />,
        component: <Users />
    },
    {
        label: 'Report',
        path: '/report-managerment',
        icon: <FileIcon />,
        component: ''
    },
    {
        label: 'Statistical',
        path: '/statistical-managerment',
        icon: <GlobeIcon />,
        component: ''
    },
];

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Header />
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    {/* Sidebar Header */}
                    <div className="sidebar-header" onClick={toggleSidebar}>
                        <HamburgerMenuIcon />
                    </div>
                    {/* Sidebar Links */}
                    <div className="sidebar-links">
                        <div className='sidebar-child'>
                            <ul>
                                {sideBarMenu.map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink
                                            to={item.path}
                                            activeClassName='active'
                                        >
                                            <Flex>
                                                <Button style={{ color: 'white' }} variant="ghost">
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </Button>
                                            </Flex>

                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Box style={{ marginLeft: 260, marginTop: 20 }}>
                <Routes>
                    <Route path="/user-managerment" element={<Users />} />
                </Routes>
            </Box>
        </div>
    );
};

export default SideBar;
