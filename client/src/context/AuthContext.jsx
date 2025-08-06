
import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                setIsAuthenticated(true)
                setUser(parsedUser)
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        setLoading(false)
    }, [])

    const login = (token, displayName, email) => {
        const userData = { displayName, email }
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setIsAuthenticated(true)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
