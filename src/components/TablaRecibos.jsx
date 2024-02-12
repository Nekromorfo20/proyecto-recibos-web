import { useNavigate } from "react-router-dom"

const TablaRecibos = ({ recibo, handleEliminarRecibo }) => {
    const goTo = useNavigate()
    const { id, proveedor, monto, moneda, fecha, comentario } = recibo

    return (
    <tr>
        <td>{id}</td>
        <td>{proveedor}</td>
        <td>{monto}</td>
        <td>{moneda}</td>
        <td>{fecha}</td>
        <td>{comentario}</td>
        <td>
            <button onClick={() => goTo(`/recibo/${id}/editar`)}>Editar</button>
        </td>
        <td>
            <button onClick={() => handleEliminarRecibo(id)}>Eliminar</button>
        </td>
    </tr>
    )
}

export default TablaRecibos