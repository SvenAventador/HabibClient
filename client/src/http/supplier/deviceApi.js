const {
    $authHost
} = require('../index')

export const getOneGood = async (id) => {
    const {data} = await $authHost.get(`api/supplier/getOneGood?id=${id}`)
    return data
}

export const getAllGoods = async (userId) => {
    const {data} = await $authHost.get(`api/supplier/getAllGoods?userId=${userId}`)
    return data
}

export const addGood = async (device) => {
    const {data} = await $authHost.post('api/supplier/addGood', device)
    return data
}

export const updateGood = async (device) => {
    const {data} = await $authHost.put('api/supplier/updateGood', device)
    return data
}

export const deleteOneGood = async (id) => {
    const {data} = await $authHost.delete('api/supplier/deleteOneGood', {data: {id}})
    return data
}

export const deleteAllGoods = async (userId) => {
    const {data} = await $authHost.delete('api/supplier/deleteAllGoods', {data: {userId}})
    return data
}