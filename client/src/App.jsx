
import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import Navbar from "./components/Navbar"
import { useAuth } from "./context/AuthContext"
import { useNotification } from "./context/NotificationContext"
import Notification from "./components/Notification"

function AuthRedirectHandler() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const { showNotification } = useNotification()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get("token")
    const name = params.get("name")
    const email = params.get("email")

    if (token && name && !isAuthenticated) {
      login(token, name, email)
      showNotification(`Welcome, ${name}!`, "success")

      const newUrl = new URL(window.location.href)
      newUrl.search = "" // Clear all query parameters
      window.history.replaceState({}, document.title, newUrl.toString())

      navigate("/dashboard", { replace: true })
    } else if (isAuthenticated && (token || name || email)) {
      const newUrl = new URL(window.location.href)
      newUrl.search = ""
      window.history.replaceState({}, document.title, newUrl.toString())
      if (location.pathname !== "/dashboard") {
        navigate("/dashboard", { replace: true })
      }
    }
  }, [location, login, navigate, showNotification, isAuthenticated])

  return null
}

function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-text">Loading...</p>
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <Notification />
      <AuthRedirectHandler />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
