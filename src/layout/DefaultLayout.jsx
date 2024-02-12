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
            <nav>
                <ul>
                    <li>
                        {`Hola ${nombre}`}
                    </li>
                    <li>
                        <button onClick={handleCerrarSesion}>
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            {children}
        </main>
    </>
    )
}

export default DefaultLayout