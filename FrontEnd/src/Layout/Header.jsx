import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, Grid, Heading, Separator, Text, Box } from '@radix-ui/themes';
import { BellIcon } from '@radix-ui/react-icons';
import { LogoutUser } from '@/Api/apiRequest';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from '@/context/ToastContext';
import { createAxios } from '@/intercepter';
import { logOutSuccess } from '@/redux/authSlice';
import '@/css/header.css';

export default function Header({ isOpen }) {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const id = user?.user?._id;
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const handleLogout = async () => {
        LogoutUser(id, dispatch, navigate, accessToken, toast, axiosJWT);
    }

    return (
        <>
            <Flex align="center" justify="between" className={`header ${isOpen ? 'open' : 'closed'}`}>
                <Box>
                    <Heading className="header-heading">HRDept Company</Heading>
                </Box>
                <Flex align="center" gap="6" className="header-user-info">
                    <BellIcon />
                    <Flex direction='column' align="end">
                        <Text size="4" weight="bold">{user?.user?.firstname} {user?.user?.lastname}</Text>
                        <Text size="2" weight="light">{user?.user?.role}</Text>
                    </Flex>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user?.user?.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent style={{ width: 120 }}>
                            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                        </HoverCardContent>
                    </HoverCard>
                </Flex>
            </Flex>
            <Separator size="4" />
        </>
    );
}
