const {
    $authHost
} = require('../index')

export const getOneType = async (id) => {
    const { data } = await $authHost.get(`api/supplier/getOneType?id=${id}`);
    return data
}

export const getAllTypes = async (userId) => {
    const { data } = await $authHost.get(`api/supplier/getAllTypes?userId=${userId}`);
    return data
}

export const addType = async (typeName, userId) => {
    const {data} = await $authHost.post('api/supplier/addType', {typeName, userId})
    return data
}

export const updateType = async (id, typeName, userId) => {
    const {data} = await $authHost.put('api/supplier/updateType', {id, typeName, userId})
    return data
}

export const deleteOneType = async (id) => {
    const {data} = await $authHost.delete('api/supplier/deleteOneType', {data: {id}})
    return data
}

export const deleteAllTypes = async (userId) => {
    const {data} = await $authHost.delete('api/supplier/deleteAllTypes', {data: {userId}})
    return data
}