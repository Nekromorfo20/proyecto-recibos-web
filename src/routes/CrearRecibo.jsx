import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { crearRecibo } from '../services'

const EditarRecibo = () => {
    const auth = useAuth()
    const goTo = useNavigate()

    const [proveedorNuevo, setProveedorNuevo] = useState("")
    const [montoNuevo, setMontoNuevo] = useState(0)
    const [monedaNuevo, setMonedaNuevo] = useState("")
    const [fechaNuevo, setFechaNuevo] = useState("")
    const [comentarioNuevo, setComentarioNuevo] = useState("")
    const [errorMensaje, setErrorMensaje] = useState("")

    const handleCrearRecibo = async (e) => {
        e.preventDefault()

        // Validar datos  
        if (proveedorNuevo.trim() === "" ||
            monedaNuevo.trim() === "" ||
            fechaNuevo.trim() === "" ||
            comentarioNuevo.trim() === "") {
            setErrorMensaje("Todos los campos son obligatorios")
            return null
        }

        const valProveedor = proveedorNuevo.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        const valComentario = comentarioNuevo.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")

        if (valProveedor === null || valComentario === null) {
            setErrorMensaje("No se permiten caracteres especiales en Proveedor y Comentario")
            return null
        }

        if (Number(montoNuevo) < 0) {
            setErrorMensaje("El monto no puede ser menor a 0")
            return null
        }


        const resultado = await crearRecibo(auth.getUser(), proveedorNuevo, montoNuevo, monedaNuevo, fechaNuevo, comentarioNuevo, auth.getToken())
        if (resultado?.data?.respuesta) {
            setErrorMensaje("")
            console.log('Recibo creado con exito')
            goTo("/dashboard")
        } else {
            console.log('No se pudo crear el recibo')
            setErrorMensaje("No se pudo crear el recibo")
            return null
        }
    }

    return(
        <>
           { !!errorMensaje && <div style={{ color: "#DC143C" }}>{errorMensaje}</div> }
            <form
                onSubmit={handleCrearRecibo}
            >
                <label 
                    htmlFor="proveedor"
                >Proveedor:</label>
                <input
                    id="proveedor"
                    type="text"
                    placeholder="Ingrese nombre proveedor"
                    value={proveedorNuevo}
                    onChange={(e) => setProveedorNuevo(e.target.value)}
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
                    value={montoNuevo}
                    onChange={(e) => setMontoNuevo(e.target.value)}
                />
                <label 
                    htmlFor="moneda"
                >Moneda:</label>
                <select
                    value={monedaNuevo}
                    onChange={(e) => setMonedaNuevo(e.target.value)}
                >
                    <option value=""></option>
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
                    value={fechaNuevo}
                    onChange={(e) => setFechaNuevo(e.target.value)}
                />
                <label
                    htmlFor='comentario'
                >Comentario:</label>
                <textarea
                    id='comentario'
                    placeholder='Comentario:'
                    value={comentarioNuevo}
                    onChange={(e) => setComentarioNuevo(e.target.value)}
                />
                <input
                    type="submit"
                    value="Crear recibo"
                />
            </form>

            <Link to="/dashboard">Regresar</Link>
        </>
    )
}

export default EditarRecibo