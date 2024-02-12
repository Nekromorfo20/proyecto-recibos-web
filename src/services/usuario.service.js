import axios from "axios"

const usuarioIniciarSesion = async (nombre, contrasena) => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/usuario-inicio-sesion`,
        headers: {
            "content-type": "application/json"
        },
        data: {
            nombre: nombre,
            contrasena: contrasena
        },
        responseType: 'json'
    })

    return response
}

export {
    usuarioIniciarSesion
}