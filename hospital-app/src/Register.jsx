import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Registration() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const [isFirstUser, setIsFirstUser] = useState(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        checkUsers()
    }, [])

    const checkUsers = async () => {
        try {
            const response = await fetch(
                "https://localhost:7172/api/user/count"
            )

            if (!response.ok) {
                throw new Error("Could not check users.")
            }

            const data = await response.json()

            setIsFirstUser(data.count === 0)

            if (data.count === 0) {
                setRole("Owner")
            }

        } catch (error) {
            console.error(error)
            setError("Could not connect to the server.")
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        setMessage("")
        setError("")

        if (!username || !password || !role) {
            setError("Please fill in all fields.")
            return
        }

        const token = localStorage.getItem("token")

        try {
            const response = await fetch(
                "https://localhost:7172/api/user/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`
                            }
                            : {})
                    },

                    body: JSON.stringify({
                        username,
                        password,
                        role
                    })
                }
            )

            const data = await response.text()

            if (!response.ok) {
                setError(data)
                return
            }

            setMessage("User registered successfully.")

            setUsername("")
            setPassword("")

            if (isFirstUser) {
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            }

        } catch (error) {
            console.error(error)
            setError("Could not connect to the server.")
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>

                <p className="text-muted mt-3">
                    Checking registration...
                </p>
            </div>
        )
    }

    return (
        <div className="bg-light min-vh-100">

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-5">

                        <div className="card shadow-sm border-0">

                            <div className="card-body p-4">

                                <div className="text-center mb-4">

                                    <i className="bi bi-hospital text-primary fs-1"></i>

                                    <h2 className="fw-bold mt-2">
                                        {isFirstUser
                                            ? "Create Hospital Owner"
                                            : "Register User"
                                        }
                                    </h2>

                                    <p className="text-muted mb-0">
                                        {isFirstUser
                                            ? "Create the first administrator account."
                                            : "Create a new hospital system user."
                                        }
                                    </p>

                                </div>


                                {isFirstUser && (
                                    <div className="alert alert-info">
                                        <i className="bi bi-info-circle me-2"></i>

                                        No users exist yet. The first account
                                        will automatically be the Owner.
                                    </div>
                                )}


                                {!isFirstUser && (
                                    <div className="alert alert-warning">
                                        <i className="bi bi-shield-lock me-2"></i>

                                        Only an authorized Owner can create
                                        additional users.
                                    </div>
                                )}


                                <form onSubmit={handleRegister}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            placeholder="Enter username"
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter password"
                                        />

                                    </div>


                                    <div className="mb-4">

                                        <label className="form-label">
                                            Role
                                        </label>

                                        {isFirstUser ? (

                                            <select
                                                className="form-select"
                                                value={role}
                                                disabled
                                            >
                                                <option value="Owner">
                                                    Owner
                                                </option>
                                            </select>

                                        ) : (

                                            <select
                                                className="form-select"
                                                value={role}
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Select Role
                                                </option>

                                                <option value="Receptionist">
                                                    Receptionist
                                                </option>
                                            </select>

                                        )}

                                    </div>


                                    {error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}


                                    {message && (
                                        <div className="alert alert-success">
                                            {message}
                                        </div>
                                    )}


                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        <i className="bi bi-person-plus me-2"></i>

                                        {isFirstUser
                                            ? "Create Owner"
                                            : "Create User"
                                        }

                                    </button>

                                </form>


                                <div className="text-center mt-4">

                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        Already have an account? Login
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Registration