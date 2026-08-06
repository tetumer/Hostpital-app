import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
function Login(){
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

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
                <button>Login</button>
            </div>
        </div>
    )
}
export default Login