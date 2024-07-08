import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export function DialogDelete({ open, onOpenChange, itemUser, setIsFetching, isFetching }) {
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const { toast } = useToast()
    const handleCancel = () => {
        onOpenChange(false);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${baseURL}user-managerment/${itemUser?._id}`)
            onOpenChange(false)
            setIsFetching(!isFetching)
            toast({
                description: 'Delete user success',
            })
        } catch (e) {
            console.log('Err:', e);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete user</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <span style={{ color: 'red' }}>'{itemUser?.email}'</span> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
