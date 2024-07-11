import { LogoutUser } from '@/Api/apiRequest';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from '@/context/ToastContext';
import { BellIcon } from '@radix-ui/react-icons';
import { Flex, Grid, Heading, Separator, Text } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const id = user?.user?._id;
    const accessToken = user?.accessToken
    const dispatch = useDispatch();
    const  toast  = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        LogoutUser(id, dispatch, navigate, accessToken, toast)
    }

    return (
        <>
            <Flex align="center" justify="between" maxWidth="1800px" pl="260px" py="2" gap={3}>
                <Grid>
                    <Heading>HRDept Company</Heading>
                </Grid>
                <Grid>
                    <Flex align="center" gapX="6">
                        <BellIcon />
                        <Flex direction='column' align="end">
                            <Text size="4" weight="bold">Admin</Text>
                            <Text size="2" weight="light">admin</Text>
                        </Flex>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </HoverCardTrigger>
                            <HoverCardContent style={{ width: 120 }}>
                                <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                            </HoverCardContent>
                        </HoverCard>
                    </Flex>
                </Grid>
            </Flex>
            <Separator size="4" />
            
        </>
    );
}
