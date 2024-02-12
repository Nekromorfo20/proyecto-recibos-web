import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { obtenerReciboService, editarReciboService } from '../services'
import DefaultLayout from "../layout/DefaultLayout"

const EditarRecibo = () => {
    const auth = useAuth()
    const location = useLocation()
    const goTo = useNavigate()

    const [idRecibo, setIdRecibo] = useState(null)
    const [proveedorEditado, setProveedorEditado] = useState("")
    const [montoEditado, setMontoEditado] = useState(0)
    const [monedaEditado, setMonedaEditado] = useState("")
    const [fechaEditado, setFechaEditado] = useState("")
    const [comentarioEditado, setComentarioEditado] = useState("")
    const [errorMensaje, setErrorMensaje] = useState("")

    const buscarReciboAEditar = async () => {
        let id = Number(location.pathname.replace(/\D/g, ""))

        const respuesta = await obtenerReciboService(id, auth.obtenerToken())
        if (respuesta?.data?.statusCode == 200) {
            const { proveedor, monto, moneda, fecha, comentario } = respuesta.data.data
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
            setErrorMensaje("!El nombre del proveedor es obligatorio¡")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        const valProveedor = proveedorEditado.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        const valComentario = comentarioEditado.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        
        if (valProveedor === null || valComentario === null) {
            setErrorMensaje("¡No se permiten caracteres especiales en los campos proveedor y comentario!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        if (Number(montoEditado) < 0) {
            setErrorMensaje("¡El monto no puede ser menor a 0!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        const resultado = await editarReciboService(idRecibo, proveedorEditado, montoEditado, monedaEditado, fechaEditado, comentarioEditado, auth.obtenerToken())
        if (resultado?.data?.statusCode == 200) {
            setErrorMensaje("")
            alert("¡El recibo se ha actualizado con exito!")
            goTo("/dashboard")
        } else {
            setErrorMensaje("¡Ocurrio un error al actualizar el recibo!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }
    }

    useEffect(() => {
        buscarReciboAEditar()
    }, [])

    return(
    <>
        <DefaultLayout>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <h2>EDITANDO RECIBO:</h2>
                    <hr className="hr mb-4" />

                    <form onSubmit={handleEditarRecibo}>
                        { !!errorMensaje && 
                            <div className="alert alert-danger mb-3" role="alert">{errorMensaje}</div> 
                        }
                        <div className="mb-3">
                            <label htmlFor="proveedor" className="form-label">Proveedor:</label>
                            <input id="proveedor" type="text" className="form-control" placeholder="Ingrese nombre proveedor" value={proveedorEditado} onChange={(e) => setProveedorEditado(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="monto" className="form-label">Monto:</label>
                            <input id="monto" type="number" className="form-control" placeholder="Ingrese monto" value={montoEditado} onChange={(e) => setMontoEditado(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moneda" className="form-label">Moneda:</label>
                            <select
                                id="moneda"
                                className="form-select"
                                value={monedaEditado}
                                onChange={(e) => setMonedaEditado(e.target.value)}
                            >
                                <option value="MXN">MXN</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="MXN">GBP</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="fecha"
                                className="form-label"
                            >Fecha:</label>
                            <input
                                id="fecha"
                                type="date"
                                className="form-control"
                                value={fechaEditado}
                                onChange={(e) => setFechaEditado(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='comentario' className="form-label">Comentario:</label>
                            <textarea className="form-control" id="comentario" rows="3" placeholder="Ingrese algun comentario" value={comentarioEditado} onChange={(e) => setComentarioEditado(e.target.value)} />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-secondary" to="/dashboard">Regresar</Link>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Actualizar recibo"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    </>
    )
}

export default EditarRecibo