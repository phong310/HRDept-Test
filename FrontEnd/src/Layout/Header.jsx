import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BellIcon } from '@radix-ui/react-icons';
import { Flex, Grid, Heading, Separator, Text } from '@radix-ui/themes';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';

export default function Header() {
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
                                <Button variant="ghost">Logout</Button>
                            </HoverCardContent>
                        </HoverCard>
                    </Flex>
                </Grid>
            </Flex>
            <Separator size="4" />
            
        </>
    );
}
