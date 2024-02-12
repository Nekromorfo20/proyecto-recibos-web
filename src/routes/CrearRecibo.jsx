import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { crearReciboService } from '../services'
import DefaultLayout from "../layout/DefaultLayout"

const CrearRecibo = () => {
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
            setErrorMensaje("!Todos los campos son obligatorios¡")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        const valProveedor = proveedorNuevo.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")
        const valComentario = comentarioNuevo.match("^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$")

        if (valProveedor === null || valComentario === null) {
            setErrorMensaje("¡No se permiten caracteres especiales en los campos proveedor y comentario!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        if (Number(montoNuevo) < 0) {
            setErrorMensaje("¡El monto no puede ser menor a 0!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }

        const resultado = await crearReciboService(auth.obtenerNombre(), proveedorNuevo, montoNuevo, monedaNuevo, fechaNuevo, comentarioNuevo, auth.obtenerToken())
        if (resultado?.data?.statusCode == 200) {
            setErrorMensaje("")
            alert("¡El recibo se ha creado con exito!")
            goTo("/dashboard")
        } else {
            setErrorMensaje("¡Ocurrio un error al crear el recibo!")
            setTimeout(() => {
                setErrorMensaje("")
            }, 5000)
            return null
        }
    }

    return(
    <>
        <DefaultLayout>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <h2>CREANDO NUEVO RECIBO:</h2>
                    <hr className="hr mb-4" />

                    <form onSubmit={handleCrearRecibo}>
                        { !!errorMensaje && 
                            <div className="alert alert-danger mb-3" role="alert">{errorMensaje}</div> 
                        }
                        <div className="mb-3">
                            <label htmlFor="proveedor" className="form-label">Proveedor:</label>
                            <input id="proveedor" type="text" className="form-control" placeholder="Ingrese nombre proveedor" value={proveedorNuevo} onChange={(e) => setProveedorNuevo(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="monto" className="form-label">Monto:</label>
                            <input id="monto" type="number" className="form-control" placeholder="Ingrese monto" value={montoNuevo} onChange={(e) => setMontoNuevo(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moneda" className="form-label">Moneda:</label>
                            <select
                                id="moneda"
                                className="form-select"
                                value={monedaNuevo}
                                onChange={(e) => setMonedaNuevo(e.target.value)}
                            >
                                <option value=""></option>
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
                                value={fechaNuevo}
                                onChange={(e) => setFechaNuevo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='comentario' className="form-label">Comentario:</label>
                            <textarea className="form-control" id="comentario" rows="3" placeholder="Ingrese algun comentario" value={comentarioNuevo} onChange={(e) => setComentarioNuevo(e.target.value)} />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-secondary" to="/dashboard">Regresar</Link>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Crear nuevo recibo"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    </>
    )
}

export default CrearRecibo