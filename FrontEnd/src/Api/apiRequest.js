import axios from "axios";
import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess } from "../redux/authSlice";

const baseURL = import.meta.env.VITE_API_PRODUCTS;


// LOGIN 
export const LoginUser = async (user, dispatch, navigate, toast) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${baseURL}auth/login`, user,
            { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        navigate("/main/user-managerment");
        toast({
            title: "SUCCESS !",
            description: 'Logged in successfully',
        })

    } catch (e) {
        dispatch(loginFailed());
        if (e.response && e.response.data && e.response.data.message) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: e.response.data.message,
            })
        } else {
            toast({
                title: "Uh oh! Something went wrong.",
                description: 'Login failed !',
                variant: 'destructive',
            })
        }
    }
}

// LOGOUT 
export const LogoutUser = async (id, dispatch, navigate, accessToken, toast, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post(`${baseURL}auth/logout`, id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(logOutSuccess());
        navigate("/")
        toast({
            title: "SUCCESS !",
            description: 'Logout successfully',
        })

    } catch (e) {
        console.log(e);
        dispatch(logOutFailed());
        toast({
            title: "Uh oh! Something went wrong.",
            description: 'Logout failed !',
            variant: 'destructive',
        })

    }
}
