import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createAxios } from "@/intercepter";
import { refreshAccessToken } from "@/redux/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function DialogDelete({ open, onOpenChange, itemUser, setIsFetching, isFetching }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, refreshAccessToken);

    const handleCancel = () => {
        onOpenChange(false);
    };

    const handleDelete = async () => {
        setIsSubmitting(true)
        try {
            const res = await axiosJWT.delete(`${baseURL}user-managerment/${itemUser?._id}`,
                {
                    headers: { token: `Bearer ${user?.accessToken}` },
                }
            );
            onOpenChange(false);
            setIsFetching(!isFetching);
            toast({
                description: 'Delete user success',
            });
        } catch (e) {
            console.log('Err:', e);
            toast({
                description: 'Delete user failed',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete user</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <span style={{ color: 'red' }}>'{itemUser?.email}'</span>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" onClick={handleDelete} style={{ marginBottom: 5 }} disabled={isSubmitting}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
