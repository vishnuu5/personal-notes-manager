
import { createContext, useState, useContext, useCallback, useRef } from "react"

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: "", type: "" })
    const timeoutRef = useRef(null)

    const showNotification = useCallback(
        (message, type = "info", duration = 3000) => {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            setNotification({ message, type })

            const id = setTimeout(() => {
                setNotification({ message: "", type: "" })
            }, duration)
            timeoutRef.current = id
        },
        [],
    )

    const hideNotification = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setNotification({ message: "", type: "" })
    }, [])

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)
