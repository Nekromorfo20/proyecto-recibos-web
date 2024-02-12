import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { obtenerRecibo, editarRecibo } from '../services'

const EditarRecibo = () => {
    const auth = useAuth()
    const location = useLocation()
    const goTo = useNavigate()

    const [idRecibo, setIdRecibo] = useState(0)
    const [proveedorEditado, setProveedorEditado] = useState("")
    const [montoEditado, setMontoEditado] = useState(0)
    const [monedaEditado, setMonedaEditado] = useState("")
    const [fechaEditado, setFechaEditado] = useState("")
    const [comentarioEditado, setComentarioEditado] = useState("")

    const buscarReciboAEditar = async () => {
        let id = Number(location.pathname.replace(/\D/g, ""))

        const respuesta = await obtenerRecibo(id, auth.getToken())
        if (respuesta?.data?.respuesta) {
            const { proveedor, monto, moneda, fecha, comentario } = respuesta.data.respuesta
            setIdRecibo(id)
            setProveedorEditado(proveedor)
            setMontoEditado(monto)
            setMonedaEditado(moneda)
            setFechaEditado(fecha)
            setComentarioEditado(comentario)

        } else {
            console.log('No se pudo obtener el recibo')
            goTo("/dashboard")
        }
    }

    const handleEditarRecibo = async () => {
        const resultado = await editarRecibo(idRecibo, proveedorEditado, montoEditado, monedaEditado, fechaEditado, comentarioEditado, auth.getToken())
        if (resultado?.data?.respuesta) {
            console.log('Recibo editadoo con exito')
            goTo("/dashboard")
        } else {
            console.log('No se pudo actualizar el recibo')
            goTo("/dashboard")
        }
    }

    useEffect(() => {
        buscarReciboAEditar()
    }, [])

    return(
        <>
            <p>RECIBO A EDITAR:</p>
            <p>ID:{idRecibo}</p>
            <p>Proveedor:{proveedorEditado}</p>
            <p>Monto:{montoEditado}</p>
            <p>Moneda:{monedaEditado}</p>
            <p>Fecha:{fechaEditado}</p>
            <p>Comentario:{comentarioEditado}</p>

            <button onClick={handleEditarRecibo}>
                Editar
            </button>

            <Link to="/dashboard">Regresar</Link>
        </>
    )
}

export default EditarRecibo