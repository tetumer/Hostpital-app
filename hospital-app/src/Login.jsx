import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 
function Login(){
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                console.log("Logged in");

                localStorage.setItem("token", data.token);

                navigate("/dashboard");
            })
            .catch((error) => {
                alert(error.message)
            })
    }

  

    return(
        <div>
            <h1>Login</h1>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default Login

