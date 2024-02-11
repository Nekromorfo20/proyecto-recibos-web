import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
    getToken: () => {},
    saveToken: () => {},
    getUser: () => {},
    saveUser: () => {}
})

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const getToken = () => {
        return token
    }

    const saveToken = (tokenData) => {
        setToken(tokenData)
        localStorage.setItem("token", JSON.stringify(tokenData))
        setIsAuthenticated(true)
    }

    const getUser = () => {
        return user
    }

    const saveUser = (userData) => {
        setUser(userData)
        localStorage.setItem("nombre", JSON.stringify(userData))
        setIsAuthenticated(true)
    }

    async function checkAuth() {
        if (token != null && user != null) {
            // El usuario ya está autenticado
            setIsAuthenticated(true)
        } else {
            // El usuario no está autenticado
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkAuth()
      }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, getToken, saveToken, getUser, saveUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)