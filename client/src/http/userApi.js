import {jwtDecode} from 'jwt-decode'

const {
    $host,
    $authHost
} = require('./index')

export const registration = async (userName, emailUser, passwordUser) => {
    const {data} = await $host.post('api/user/registration', {
        userName,
        emailUser,
        passwordUser
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (emailUser, passwordUser) => {
    const {data} = await $host.post('api/user/login', {
        emailUser,
        passwordUser
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logout = async () => {
    const {data} = await $authHost.get('api/user/logout')
    localStorage.removeItem('token')
    return data
}