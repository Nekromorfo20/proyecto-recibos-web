import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { usuarioIniciarSesion } from '../services'
import DefaultLayout from "../layout/DefaultLayout"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorResponse, setErrorResponse] = useState("")

    const auth = useAuth()
    const goTo = useNavigate()

    async function handleSubmit (e) {
        e.preventDefault()

        try {
            if ((username.trim() === '') || (!password.trim() === '')) {
                setErrorResponse('!Todos los campos son obligatorios¡')
                return null
            }

            const response = await usuarioIniciarSesion(username, password)
            if (response) {
                console.log("¡Inicio de sesión correcto!")
                setErrorResponse("")

                if (response?.data?.respuesta) {
                    auth.saveToken(response.data.respuesta.token)
                    auth.saveUser(response.data.respuesta.nombre)
                    goTo("/dashboard")
                }

            } else {
                console.log('¡Ocurrio un error!')
                setErrorResponse('!Error al iniciar sesión¡')
                return null
            }

        } catch (error) {
            console.log(error)
            setErrorResponse('!Error al iniciar sesión¡')
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                { !!errorResponse && <div className="errorMessage">{errorResponse}</div> }
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button>Login</button>
            </form>
        </DefaultLayout>
    )
}