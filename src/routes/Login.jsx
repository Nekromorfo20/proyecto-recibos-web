import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { usuarioIniciarSesionService } from '../services'

const Login = () => {
    const [nombre, setNombre] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [errorMensaje, setErrorMensaje] = useState("")

    const auth = useAuth()
    const goTo = useNavigate()

    async function handleSubmit (e) {
        e.preventDefault()

        try {
            if ((nombre.trim() === '') || (!contrasena.trim() === '')) {
                setErrorMensaje('!Todos los campos son obligatorios¡')

                setTimeout(() => {
                    setErrorMensaje("")
                }, 3000)
                return null
            }

            const response = await usuarioIniciarSesionService(nombre, contrasena)
            if (response) {
                setErrorMensaje("")

                if (response?.data?.statusCode == 200) {
                    auth.guardarToken(response.data.data.token)
                    auth.guardarNombre(response.data.data.nombre)
                    goTo("/dashboard")
                }

            } else {
                console.log('¡Ocurrio un error!')
                setErrorMensaje('!Error al iniciar sesión¡')
                return null
            }

        } catch (error) {
            console.log(error)
            setErrorMensaje('!Error al iniciar sesión¡')
        }
    }

    if (auth.autenticado) {
        return <Navigate to="/dashboard" />
    }

    return (
    <form className="form" onSubmit={handleSubmit}>
        <h1>¡Bienvenido!</h1>
        { !!errorMensaje && <div className="errorMessage">{errorMensaje}</div> }
        <label
            htmlFor="nombre"
        >Nombre usuario:</label>
        <input
            id="nombre"
            type="text"
            placeholder="Ingrese nombre del usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <label
            htmlFor="contrasena"
        >Contraseña:</label>
        <input
            id="contrasena"
            type="password"
            placeholder="Ingrese contraseña del usuario"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
        />
        <input
            type="submit"
            value="Iniciar sesión"
        />
    </form>
    )
}

export default Login