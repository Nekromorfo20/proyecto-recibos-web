import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    autenticado: false,
    obtenerToken: () => {},
    guardarToken: () => {},
    obtenerNombre: () => {},
    guardarNombre: () => {},
    cierraSesion: () => {}
})

export function AuthProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false)
    const [token, setToken] = useState(null)
    const [nombre, setNombre] = useState(null)

    const obtenerToken = () => {
        return token
    }

    const guardarToken = (tokenData) => {
        setToken(tokenData)
        localStorage.setItem("token", JSON.stringify(tokenData))
        setAutenticado(true)
    }

    const obtenerNombre = () => {
        return nombre
    }

    const guardarNombre = (nombreData) => {
        setNombre(nombreData)
        localStorage.setItem("nombre", JSON.stringify(nombreData))
        setAutenticado(true)
    }

    const cierraSesion = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("nombre")
        setAutenticado(false)
    }

    useEffect(() => {
        const tokeSesion = JSON.parse(localStorage.getItem("token"))
        const nombreSesion = JSON.parse(localStorage.getItem("nombre"))

        if (tokeSesion && nombreSesion) {
          setAutenticado(true)
          guardarToken(tokeSesion)
          guardarNombre(nombreSesion)

        } else {
          setAutenticado(false)
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }, [])

    return (
        <AuthContext.Provider value={{ 
            autenticado,
            obtenerToken,
            guardarToken,
            obtenerNombre,
            guardarNombre,
            cierraSesion
        }}>{children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)