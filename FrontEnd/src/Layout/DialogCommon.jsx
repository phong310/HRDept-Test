import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { createAxios } from '@/intercepter';
import { refreshAccessToken } from '@/redux/authSlice';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Box, Flex, Grid, IconButton, Separator, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function DialogCommon({
    open,
    onOpenChange,
    setIsFetching,
    isFetching,
    itemUser,
    isEdit,
    setIsEdit }) {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, refreshAccessToken);
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const clearForm = () => {
        reset({
            email: '',
            phone: '',
            firstname: '',
            lastname: '',
            password: '',
            confirm: ''
        });
        setValue('role', 'admin');
        setPreviewUrl(null);
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
        clearForm();
        setIsEdit(false)
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const onHandleSubmit = async () => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('email', watch("email"));
        formData.append('phone', watch("phone"));
        formData.append('firstname', watch("firstname"));
        formData.append('lastname', watch("lastname"));
        formData.append('role', watch("role"));
        formData.append('password', watch("password"));
        formData.append('confirm', watch("confirm"));

        if (selectedFile) {
            formData.append('file', selectedFile);
        } else if (isEdit && itemUser.avatar) {
            formData.append('avatar', itemUser.avatar);
        }

        try {
            let res;
            if (itemUser) {
                res = await axiosJWT.put(`${baseURL}user-managerment/update/${itemUser?._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: `Bearer ${user?.accessToken}`
                    }
                });
            } else {
                res = await axiosJWT.post(`${baseURL}user-managerment/create-new`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: `Bearer ${user?.accessToken}`
                    }
                });
            }

            if (res) {
                toast({
                    description: itemUser ? 'User updated successfully' : 'Create new user success',
                });
                clearForm();
                setIsFetching(!isFetching);
                onOpenChange(false);
                setIsEdit(false);
            }

        } catch (error) {
            console.error('Err:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (itemUser && isEdit) {
            setValue('email', itemUser.email);
            setValue('phone', itemUser.phone);
            setValue('firstname', itemUser.firstname);
            setValue('lastname', itemUser.lastname);
            setValue('role', itemUser.role);
            setValue('password', itemUser.password);
            setValue('confirm', itemUser.confirm);
            setPreviewUrl(itemUser.avatar);
        }
    }, [itemUser, setValue, isEdit]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent style={{ maxWidth: '45vw', maxHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <DialogHeader style={{ flex: '0 0 auto' }}>
                    <DialogTitle>{isEdit ? 'Update user' : 'Create New User'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onHandleSubmit)} style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                    <Flex align='start' justify='between' gap='2' style={{ flexWrap: 'wrap' }}>
                        <Grid style={{ paddingLeft: 10 }}>
                            <Text>User detail</Text>
                            <Flex align='center' justify='between' gap='2' style={{ flexWrap: 'wrap' }}>
                                <Grid width={{ xs: '100%', md: '49%' }} style={{ padding: '10px 0px' }}>
                                    <Label style={{ padding: '10px 0px' }} htmlFor="email" className="text-right">
                                        Email <span style={{ color: 'red' }}>*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        className="col-span-3"
                                        placeholder='Enter email'
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span style={{ color: 'red', fontSize: 14 }}>Email is required</span>}
                                </Grid>
                                <Grid>
                                    <select {...register("role", { required: true })}>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                        <option value="tester">Tester</option>
                                    </select>
                                    {errors.role && <span style={{ color: 'red', fontSize: 14 }}>Role is required</span>}
                                </Grid>
                            </Flex>
                            <Grid style={{ padding: '10px 0px' }}>
                                <Label style={{ padding: '10px 0px' }} htmlFor="phone" className="text-right">
                                    Phone <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder='Enter phone number'
                                    {...register("phone", { required: true })}
                                />
                                {errors.phone && <span style={{ color: 'red', fontSize: 14 }}>Phone number is required</span>}
                            </Grid>
                            <Flex align='center' justify='between' gap='2' wrap='wrap'>
                                <Grid width={{ xs: '100%', md: '49%' }} style={{ padding: '10px 0px' }}>
                                    <Label style={{ padding: '10px 0px' }} htmlFor="firstname" className="text-right">
                                        First Name <span style={{ color: 'red' }}>*</span>
                                    </Label>
                                    <Input
                                        id="firstname"
                                        placeholder='Enter first name'
                                        {...register("firstname", { required: true })}
                                    />
                                    {errors.firstname && <span style={{ color: 'red', fontSize: 14 }}>First name is required</span>}
                                </Grid>
                                <Grid width={{ xs: '100%', md: '49%' }}>
                                    <Label style={{ padding: '10px 0px' }} htmlFor="lastname" className="text-right">
                                        Last Name <span style={{ color: 'red' }}>*</span>
                                    </Label>
                                    <Input
                                        id="lastname"
                                        placeholder='Enter last name'
                                        {...register("lastname", { required: true })}
                                    />
                                    {errors.lastname && <span style={{ color: 'red', fontSize: 14 }}>Last name is required</span>}
                                </Grid>
                            </Flex>
                            <Grid style={{ padding: '10px 0px' }}>
                                <Label style={{ padding: '10px 0px' }} htmlFor="password" className="text-right">
                                    Password <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Box style={{ position: 'relative' }}>
                                    <Input
                                        id="password"
                                        placeholder='Enter password'
                                        type={showPassword ? 'text' : 'password'}
                                        style={{ paddingRight: '2.5rem', marginBottom: 20 }}
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && <span style={{ color: 'red', fontSize: 14, position: 'absolute', top: '100%' }}>{errors.password.message}</span>}
                                    <IconButton
                                        type='button'
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '35%',
                                            right: '0.5rem',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid style={{ padding: '10px 0px' }}>
                                <Label style={{ padding: '10px 0px' }} htmlFor="confirm" className="text-right">
                                    Confirm password <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Box style={{ position: 'relative' }}>
                                    <Input
                                        id="confirm"
                                        placeholder='Enter confirm password'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        style={{ paddingRight: '2.5rem' }}
                                        {...register("confirm", {
                                            required: "Confirm password is required",
                                            validate: value => value === watch("password") || "Password do not match"
                                        })}
                                    />
                                    {errors.confirm && <span style={{ color: 'red', fontSize: 14, position: 'absolute', top: '100%' }}>{errors.confirm.message}</span>}
                                    <IconButton
                                        type='button'
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '0.5rem',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        {showConfirmPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Separator orientation="vertical" size="4" />
                        <Grid style={{ marginRight: 80, marginTop: 10 }}>
                            <Text>Profile picture</Text>
                            <Grid style={{ border: '1px dashed #B2BAC2', borderRadius: 5, padding: 30, marginTop: 20 }}>
                                <IconButton type='button'>
                                    <label htmlFor="file-upload">
                                        {previewUrl ?
                                            <img src={previewUrl} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                                            :
                                            <img src={'/add_img.png'} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
                                        <input
                                            id="file-upload"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </IconButton>
                                <Text style={{ color: 'black', marginTop: 10 }}>Select an image</Text>
                            </Grid>
                        </Grid>
                    </Flex>
                    <DialogFooter style={{ marginTop: 30, flex: '0 0 auto' }}>
                        <Button type="button" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} style={{ marginBottom: 5 }}>
                            {isEdit ? 'Update' : 'Create new'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
