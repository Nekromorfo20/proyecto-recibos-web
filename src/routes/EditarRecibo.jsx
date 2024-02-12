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
    const [errorMensaje, setErrorMensaje] = useState("")

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

    const handleEditarRecibo = async (e) => {
        e.preventDefault()

        // Validar datos  
        if (proveedorEditado.trim() === "") {
            setErrorMensaje("Debe colocar el nombre del proveedor")
            return null
        }

        const valProveedor = proveedorEditado.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        const valComentario = comentarioEditado.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        
        if (valProveedor === null || valComentario === null) {
            setErrorMensaje("No se permiten caracteres especiales en Proveedor y Comentario")
            return null
        }

        if (Number(montoEditado) < 0) {
            setErrorMensaje("El monto no puede ser menor a 0")
            return null
        }

        const resultado = await editarRecibo(idRecibo, proveedorEditado, montoEditado, monedaEditado, fechaEditado, comentarioEditado, auth.getToken())
        if (resultado?.data?.respuesta) {
            setErrorMensaje("")
            console.log('Recibo editado con exito')
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
           { !!errorMensaje && <div style={{ color: "#DC143C" }}>{errorMensaje}</div> }
            <form
                onSubmit={handleEditarRecibo}
            >
                <label 
                    htmlFor="proveedor"
                >Proveedor:</label>
                <input
                    id="proveedor"
                    type="text"
                    placeholder="Ingrese nombre proveedor"
                    value={proveedorEditado}
                    onChange={(e) => setProveedorEditado(e.target.value)}
                />
                <label 
                    htmlFor="monto"
                >Monto:</label>
                <input
                    id="monto"
                    type="number"
                    min="0"
                    step=".01"
                    placeholder="Ingrese monto"
                    value={montoEditado}
                    onChange={(e) => setMontoEditado(e.target.value)}
                />
                <label 
                    htmlFor="moneda"
                >Moneda:</label>
                <select
                    value={monedaEditado}
                    onChange={(e) => setMonedaEditado(e.target.value)}
                >
                    <option value="MXN">MXN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">GBP</option>
                </select>
                <label
                    htmlFor="fecha"
                >Fecha:</label>
                <input
                    id="fecha"
                    type="date"
                    value={fechaEditado}
                    onChange={(e) => setFechaEditado(e.target.value)}
                />
                <label
                    htmlFor='comentario'
                >Comentario:</label>
                <textarea
                    id='comentario'
                    placeholder='Comentario:'
                    value={comentarioEditado}
                    onChange={(e) => setComentarioEditado(e.target.value)}
                />
                <input
                    type="submit"
                    value="Actualizar recibo"
                />
            </form>

            <Link to="/dashboard">Regresar</Link>
        </>
    )
}

export default EditarRecibo