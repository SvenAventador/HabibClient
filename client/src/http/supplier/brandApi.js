const {
    $authHost
} = require('../index')

export const getOneBrand = async (id) => {
    const { data } = await $authHost.get(`api/supplier/getOneBrand?id=${id}`);
    return data
}

export const getAllBrands = async (userId) => {
    const { data } = await $authHost.get(`api/supplier/getAllBrands?userId=${userId}`);
    return data;
}

export const addBrand = async (brandName, userId) => {
    const {data} = await $authHost.post('api/supplier/addBrand', {brandName, userId})
    return data
}

export const updateBrand = async (id, brandName, userId) => {
    const {data} = await $authHost.put('api/supplier/updateBrand', {id, brandName, userId})
    return data
}

export const deleteOneBrand = async (id) => {
    const {data} = await $authHost.delete('api/supplier/deleteOneBrand', {data: {id}})
    return data
}

export const deleteAllBrands = async (userId) => {
    const {data} = await $authHost.delete('api/supplier/deleteAllBrands', {data: {userId}})
    return data
}