import {
    loginStaff,
    logoutStaff,
    refreshStaff,
} from "../../service/staffService";
import toast from "react-hot-toast";
import {
    login,
    loginError,
    loginSuccess,
    logout,
    logoutError,
    logoutSuccess,
    refresh,
    refreshError,
    refreshSuccess,
} from "./authSlice";

export const handleLogin = (username, password, nav) => {
    return async (dispatch, getState) => {
        dispatch(login());

        let res = await loginStaff(username, password);
        if (res) {
            if (res.code === 0) {
                // Đăng nhập thành công
                dispatch(loginSuccess(res.data));
                nav("/admin");
            } else if (res.code === 1) {
                // Đăng nhập thất bại
                toast.error(res.message);
                dispatch(loginError());
            }
        } else {
            // Đăng nhập thất bại
            toast.error("Error: Đăng nhập");
            dispatch(loginError());
        }
    };
};

export const handleRefresh = () => {
    return async (dispatch, getState) => {
        dispatch(refresh());

        let res = await refreshStaff();
        if (res) {
            if (res.code === 0) {
                // Refresh thành công
                dispatch(refreshSuccess(res.data));
            } else if (res.code === 1) {
                //Refresh thất bại
                dispatch(refreshError());
            }
        } else {
            //Refresh thất bại
            toast.error("Error: Refresh");
            dispatch(refreshError());
        }
    };
};

export const handleLogout = (nav) => {
    return async (dispatch, getState) => {
        dispatch(logout());

        let res = await logoutStaff();

        if (res) {
            if (res.code === 0) {
                toast.success(res.message);
                dispatch(logoutSuccess());
                // Use history object to navigate
                nav("/admin/login");
            } else if (res.code === 1) {
                toast.error(res.message);
                dispatch(logoutError());
            }
        } else {
            dispatch(logoutError());
        }
    };
};
