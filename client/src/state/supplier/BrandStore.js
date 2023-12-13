import {create} from "zustand";
import {
    addBrand,
    deleteAllBrands,
    deleteOneBrand,
    getAllBrands,
    getOneBrand,
    updateBrand
} from "../../http/supplier/brandApi";

export const useBrand = create((set) => ({
    brand: [],
    error: null,
    message: null,

    setBrand: (brands) => set({
        brand: brands
    }),

    getBrand: async (id) => {
        try {
            const data = await getOneBrand(id);
            set({brand: data});
            return data
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },
    getBrands: async (userId) => {
        try {
            const data = await getAllBrands(userId);
            set({brand: data});
            return data
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    addBrand: async (brandName, userId) => {
        try {
            const data = await addBrand(brandName, userId);
            set({brand: data});
            return data
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    updateBrand: async (id, brandName, userId) => {
        try {
            const data = await updateBrand(id, brandName, userId);
            set({brand: data});
            return data
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    deleteBrand: async (id) => {
        try {
            return await deleteOneBrand(id)
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })        }
    },

    deleteBrands: async (userId) => {
        try {
            return await deleteAllBrands(userId)
        } catch (error) {
            set({
                brand: [],
                error,
                message: error.response.data.message
            })        }
    },
}));