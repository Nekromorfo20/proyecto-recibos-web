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
                }, 5000)
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
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <form className="col-12 col-md-8 col-lg-6 col-xl-5" onSubmit={handleSubmit}>
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">   
                                <h2 className="mb-5 text-center"><u>PORTAL DE RECIBOS</u></h2>
                                { !!errorMensaje && 
                                    <div className="alert alert-danger" role="alert">{errorMensaje}</div> 
                                }
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label">Nombre usuario:</label>
                                    <input id="proveedor" type="text" className="form-control" placeholder="Ingrese nombre del usuario" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                                    <input id="contrasena" type="text" className="form-control" placeholder="Ingrese la contraseña del usuario" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="btn btn-primary btn-lg btn-block"
                                        type="submit"
                                        value="Iniciar sesión"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
      </section>
    )
}

export default Login