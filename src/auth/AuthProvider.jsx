import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
    getToken: () => {},
    saveToken: () => {},
    getUser: () => {},
    saveUser: () => {},
    logOut: () => {}
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

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("nombre")
        setIsAuthenticated(false)
    }

    useEffect(() => {
        const tokeSesion = JSON.parse(localStorage.getItem("token"))
        const userSesion = JSON.parse(localStorage.getItem("nombre"))

        if (tokeSesion && userSesion) {
          setIsAuthenticated(true)
          saveToken(tokeSesion)
          saveUser(userSesion)

        } else {
          setIsAuthenticated(false)
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }, [])

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated,
            getToken,
            saveToken,
            getUser,
            saveUser,
            logOut
        }}>{children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)