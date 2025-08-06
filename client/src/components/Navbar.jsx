
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        window.location.href = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/auth/logout`
    }

    return (
        <nav className="bg-primary p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Notes Manager
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-white text-sm md:text-lg">
                                Hello, {user.displayName ? `${user.displayName} (${user.email})` : user.email}!
                            </span>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-accent transition-colors duration-200 text-sm sm:text-base"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
