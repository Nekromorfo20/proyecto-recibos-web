import axios from "axios"

const obtenerRecibo = async (id, token) => {
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}/recibo?id=${id}`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        responseType: 'json'
    })
    return response
}

const obtenerRecibos = async (nombre, token) => {
    const exts = (nombre !== '' || nombre !== null) ? `?nombre=${nombre}` : ''

    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}/recibos${exts}`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        responseType: 'json'
    })
    return response
}

const crearRecibo = async (nombre, proveedor, monto, moneda, fecha, comentario, token) => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/recibo`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            nombre: nombre,
            proveedor: proveedor,
            monto: monto,
            moneda: moneda,
            fecha: fecha,
            comentario: comentario
        },
        responseType: 'json'
    })
    return response
}

const editarRecibo = async (id, proveedor, monto, moneda, fecha, comentario, token) => {
    const response = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_API_URL}/recibo`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            id: id,
            proveedor: proveedor,
            monto: monto,
            moneda: moneda,
            fecha: fecha,
            comentario: comentario
        },
        responseType: 'json'
    })
    return response
}

const eliminarRecibo = async (id, nombre, token) => {
    const response = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_URL}/recibo`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            id: id,
            nombre: nombre
        },
        responseType: 'json'
    })
    return response
}

export {
    obtenerRecibo,
    obtenerRecibos,
    crearRecibo,
    editarRecibo,
    eliminarRecibo
}