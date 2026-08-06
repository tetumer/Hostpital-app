import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
function Login(){
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Trying login with:", username, password)
        fetch('https://localhost:7172/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username: username, Password: password })
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid username or password')
            }
            return response.json()
            })
            .then((user) => {
            console.log('Logged in as:', user)

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

