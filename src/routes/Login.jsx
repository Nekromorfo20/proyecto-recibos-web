import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../auth/AuthProvider"
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
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/usuario-inicio-sesion`,
                data: {
                    nombre: username,
                    contrasena: password
                },
                withCredentials: false,
                responseType: 'json'
            })

            if (response) {
                // Redirigir a /dashboard y cargar token en localStorage
                console.log("¡Inicio de sesión correcto!")
                setErrorResponse("")
                goTo("/")
            } else {
                // Mostrar error en formulario
                console.log('¡Ocurrio un error!')
                setErrorResponse('!Error al iniciar sesión¡')
                return null
            }

        } catch (error) {
            console.log(error)
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