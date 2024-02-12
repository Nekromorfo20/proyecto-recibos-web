import { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
import { Link } from "react-router-dom"
import { obtenerRecibosService, eliminarReciboService } from '../services'
import TablaRecibos from "../components/TablaRecibos"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
    const auth = useAuth()
    const [recibos, setRecibos] = useState([])
    const [filtroNombre, setfiltroNombre] = useState("")

    const listarRecibos = async (nombre) => {
        const resultado = await obtenerRecibosService(nombre, auth.obtenerToken())
        setRecibos(resultado?.data?.respuesta)
    }

    const handleEliminarRecibo = async (id) => {
        const resultado = await eliminarReciboService(id, auth.obtenerNombre(), auth.obtenerToken())
        if (resultado?.data) listarRecibos()
    }

    // Carga recibos iniciales
    useEffect(() => {
        listarRecibos("")
    }, [])

    // Si se cambios el <select> se llama nuevamente al servicio de recibos con el filtro nombre
    useEffect(() => {
        listarRecibos(filtroNombre)
    }, [filtroNombre])

    return (
    <>
        <DefaultLayout>
            <h1>Listado de recibos:</h1>
            <Link to="/recibo/crear">Crear recibo</Link>
            <br />
            <select
                value={filtroNombre}
                onChange={(e) => setfiltroNombre(e.target.value)}
            >
                <option value="">Todos</option>
                <option value={auth.obtenerNombre()}>Mis recibos</option>
            </select>
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
        </DefaultLayout>
    </>
    )
}

export default Dashboard