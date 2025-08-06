
import { useNotification } from "../context/NotificationContext"
import { X } from "lucide-react"

function Notification() {
    const { notification, hideNotification } = useNotification()

    if (!notification.message) return null

    const bgColorClass = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    }[notification.type || "info"]

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${bgColorClass} transition-all duration-300 ease-in-out transform ${notification.message ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
            role="alert"
        >
            <div className="flex items-center justify-between">
                <p className="font-medium">{notification.message}</p>
                <button
                    onClick={hideNotification}
                    className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                    aria-label="Close notification"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default Notification
