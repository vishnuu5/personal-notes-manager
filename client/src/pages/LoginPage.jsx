import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function LoginPage() {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/auth/google`
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-background p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-text mb-6">Login to Your Notes</h1>
                <p className="text-gray-700 mb-8">
                    Access your personal notes securely by logging in with your Google account.
                </p>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-primary text-white py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors duration-200 font-semibold shadow-md"
                >
                    <img src="/google_logo.png?height=24&width=24" alt="Google logo" className="w-6 h-6" />
                    <span>Login with Google</span>
                </button>
                <p className="text-sm text-gray-500 mt-6">Your notes are private and accessible only to you.</p>
            </div>
        </div>
    )
}

export default LoginPage
