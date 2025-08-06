import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function HomePage() {
    const { isAuthenticated } = useAuth()

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center bg-background p-4">
            <h1 className="text-5xl font-extrabold text-text mb-6 leading-tight">
                Your Personal Notes, <span className="text-primary">Securely Managed</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                Organize your thoughts, ideas, and important information with ease. Log in to access your private notes from
                anywhere.
            </p>
            {isAuthenticated ? (
                <Link
                    to="/dashboard"
                    className="bg-primary text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
                >
                    Go to Your Dashboard
                </Link>
            ) : (
                <Link
                    to="/login"
                    className="bg-primary text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
                >
                    Get Started - Login with Google
                </Link>
            )}
            <div className="mt-12">
                <img
                    src="/management_dashboard_img.jpg?height=300&width=500"
                    alt="Notes management dashboard illustration"
                    className="rounded-lg shadow-xl border border-gray-200"
                />
            </div>
        </div>
    )
}

export default HomePage
