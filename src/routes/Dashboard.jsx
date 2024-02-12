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
        setRecibos(resultado?.data?.data)
    }

    const handleEliminarRecibo = async (id) => {
        const aceptar = confirm(`¿Esta seguro de eliminar el recibo seleccionado?`)
        if (aceptar) {
            const resultado = await eliminarReciboService(id, auth.obtenerNombre(), auth.obtenerToken())
            console.log('¡Recibo eliminado con exito!')
            if (resultado?.data?.statusCode == 200) listarRecibos(filtroNombre)
        }
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
            <div className="container py-3 h-100">
                <h1 className="display-1">Lista de recibos:</h1>
                <hr className="hr" />

                <div className="d-flex justify-content-between">
                    <Link to="/recibo/crear" className="btn btn-success" role="button">Nuevo recibo</Link>
                    <select
                        className="form-select"
                        style={{ maxWidth: 200 }}
                        value={filtroNombre}
                        onChange={(e) => setfiltroNombre(e.target.value)}
                    >
                        <option value="">Todos los recibos</option>
                        <option value={auth.obtenerNombre()}>Mis recibos</option>
                    </select>
                </div>
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Moneda</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Comentario</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
            </div>
        </DefaultLayout>
    </>
    )
}

export default Dashboard