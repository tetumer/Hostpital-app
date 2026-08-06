import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
function Settings(){
 
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notificationStatus, setNotificationStatus] = useState('off');
    const [language, setLanguage] = useState('en');
    const [fontSize, setFontSize] = useState('medium');


    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return(
        <div>
            <h1>Settings</h1>
            <div>
                <label>Theme:</label>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
            <div>
                <h1>Change password</h1>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div>
                <label>Enable Notifications</label>
                <select value={notificationStatus} onChange={(e) => setNotificationStatus(e.target.value)}>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div>
                <label>Language:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </div>
            <div>
                <label>Font Size:</label>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
        </div>

    
)




}

export default Settings