import {create} from 'zustand';
import {
    check,
    login,
    logout,
    registration
} from '../http/userApi';

export const useUser = create((set) => ({
    user: null,
    isAuth: false,
    error: null,
    message: null,

    registrationUser: async (userName, emailUser, passwordUser) => {
        try {
            const data = await registration(userName, emailUser, passwordUser);
            set({
                user: data,
                isAuth: true,
                error: null,
                message: null
            });

            return data;
        } catch (error) {
            set({
                user: null,
                isAuth: false,
                error,
                message: error.response.data.message
            });
            throw error;
        }
    },

    loginUser: async (emailUser, passwordUser) => {
        try {
            const data = await login(emailUser, passwordUser);
            set({
                user: data,
                isAuth: true,
                error: null,
                message: null
            });
            return data
        } catch (error) {
            set({
                user: null,
                isAuth: false,
                error, message:
                error.message
            });
            throw error
        }
    },

    checkUser: async () => {
        try {
            const data = await check();
            set({
                user: data,
                isAuth: true,
                error: null,
                message: null
            });
            return data;
        } catch (error) {
            if (error.statusCode === 401) {
                return null;
            }

            set({
                user: null,
                isAuth: false,
                error,
                message: error.message
            });
            throw error;
        }
    },


    logoutUser: async () => {
        try {
            await logout();
            set({
                user: null,
                isAuth: false,
                error: null,
                message: null
            });
        } catch (error) {
            set({
                user: null,
                isAuth: false,
                error, message:
                error.message
            });
        }
    },
}));
