import { useAuth } from "../auth/AuthProvider"

const DefaultLayout = ({ children }) => {
    const auth = useAuth()
    
    const nombre = JSON.parse(localStorage.getItem("nombre"))
    const handleCerrarSesion = () => {
        auth.cierraSesion()
        return null
    }

    return (
    <>
        <header>
            <nav className="px-5 navbar navbar-light bg-light justify-content-between px">
                <a className="navbar-brand text-uppercase font-weight-bold">{`BIENVENIDO ${nombre}`}</a>
                <form className="form-inline">
                    <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={handleCerrarSesion}>Cerrar sesión</button>
                </form>
            </nav>
        </header>

        <main>
            {children}
        </main>
    </>
    )
}

export default DefaultLayout