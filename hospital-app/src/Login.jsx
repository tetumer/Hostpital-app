import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        fetch('https://localhost:7172/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid username or password')
                }

                return response.json()
            })
            .then((data) => {
                console.log("Logged in")

                localStorage.setItem("token", data.token)

                navigate("/dashboard")
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div
                className="card border-0 shadow-sm"
                style={{ width: '100%', maxWidth: '420px' }}
            >

                <div className="card-body p-4 p-md-5">

                    {/* Header */}
                    <div className="text-center mb-4">

                        <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                                width: '70px',
                                height: '70px',
                                fontSize: '28px',
                                fontWeight: 'bold'
                            }}
                        >
                            H
                        </div>

                        <h1 className="fw-bold mb-1">
                            Welcome Back
                        </h1>

                        <p className="text-muted mb-0">
                            Sign in to your hospital management account
                        </p>

                    </div>


                    {/* Username */}
                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>


                    {/* Password */}
                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin()
                                }
                            }}
                        />

                    </div>


                    {/* Login */}
                    <button
                        className="btn btn-primary btn-lg w-100"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Login