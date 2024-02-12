import { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
import { eliminarRecibo, obtenerRecibos } from '../services'
import TablaRecibos from "../components/TablaRecibos"

const Dashboard = () => {
    const auth = useAuth()
    const [recibos, setRecibos] = useState([])

    const recibosFn = async () => {
        const resultado = await obtenerRecibos(auth.getUser(), auth.getToken())
        setRecibos(resultado?.data?.respuesta)
    }

    const handleEliminarRecibo = async (id) => {
        const resultado = await eliminarRecibo(id, auth.getUser(), auth.getToken())
        if (resultado?.data) recibosFn()
    }

    const handleCerrarSesion = () => {
        auth.logOut()
        return null
    }

    // Cargar todos los recibos
    useEffect(() => {
        recibosFn()
    }, [])

    return (
        <>
            <h1>Lista de recibos de {auth.getUser()}</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Proveedor</th>
                        <th>Monto</th>
                        <th>Moneda</th>
                        <th>Fecha</th>
                        <th>Comentario</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {recibos.map((recibo) => (
                        <TablaRecibos
                            key={recibo.id}
                            recibo={recibo}
                            handleEliminarRecibo={handleEliminarRecibo}
                        />
                    ))}
                </tbody>
            </table>

            <button onClick={handleCerrarSesion}>Cerrar sesión</button>
        </>
    )
}

export default Dashboard