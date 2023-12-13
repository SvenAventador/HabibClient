import {create} from "zustand";
import {addType, deleteAllTypes, deleteOneType, getAllTypes, getOneType, updateType} from "../../http/supplier/typeApi";

export const useType = create((set) => ({
    type: [],
    error: null,
    message: null,

    setType: (types) => set({
        type: types
    }),

    getType: async (id) => {
        try {
            const data = await getOneType(id);
            set({type: data});
            return data
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },
    getTypes: async (userId) => {
        try {
            const data = await getAllTypes(userId);
            set({type: data});
            return data
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })
        }
    },

    addType: async (typeName, userId) => {
        try {
            const data = await addType(typeName, userId);
            set({brand: data});
            return data
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    updateType: async (id, typeName, userId) => {
        try {
            const data = await updateType(id, typeName, userId);
            set({type: data});
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    deleteType: async (id) => {
        try {
            return await deleteOneType(id)
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })        }
    },

    deleteTypes: async (userId) => {
        try {
            return await deleteAllTypes(userId)
        } catch (error) {
            set({
                type: [],
                error,
                message: error.response.data.message
            })        }
    },
}));