import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, FileIcon, GlobeIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import Users from '@/pages/Users';
import Header from './Header';
import '@/css/sidebar.css';

const sideBarMenu = [
    { label: 'Dashboard', path: '/main/dashboard', icon: <DashboardIcon />, component: '' },
    { label: 'User', path: '/main/user-managerment', icon: <PersonIcon />, component: <Users /> },
    { label: 'Report', path: '/main/report-managerment', icon: <FileIcon />, component: '' },
    { label: 'Statistical', path: '/main/statistical-managerment', icon: <GlobeIcon />, component: '' },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
    return (
        <div>
            <Header isOpen={isOpen} />
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="sidebar-header" onClick={toggleSidebar}>
                        <HamburgerMenuIcon />
                    </div>
                    <div className="sidebar-links">
                        <div className='sidebar-child'>
                            <ul>
                                {sideBarMenu.map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink to={item.path} activeClassName='active'>
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
        </div>
    );
};

export default SideBar;
