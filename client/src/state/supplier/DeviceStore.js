import {create} from "zustand";
import {
    addGood,
    deleteAllGoods,
    deleteOneGood,
    getAllGoods,
    getOneGood,
    updateGood
} from "../../http/supplier/deviceApi";

export const useGood = create((set) => ({
    good: [],
    error: null,
    message: null,

    getOneSupplierGood: async (id) => {
        try {
            const data = await getOneGood(id);
            set({good: data});
            return data
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
        }
    },
    getAllSupplierGoods: async (userId) => {
        try {
            const data = await getAllGoods(userId);
            set({good: data});
            return data
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
        }
    },

    addSupplierGood: async (device) => {
        try {
            const data = await addGood(device);
            set({ good: data });
            return data
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },
    updateSupplierDevice: async (device) => {
        try {
            const data = await updateGood(device);
            set({ good: data });
            return data
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    deleteOneSupplierDevice: async (id) => {
        try {
            return await deleteOneGood(id)
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
        }
    },
    deleteAllSupplierDevice: async (userId) => {
        try {
            return await deleteAllGoods(userId)
        } catch (error) {
            set({
                good: [],
                error,
                message: error.response.data.message
            })
        }
    }
}))