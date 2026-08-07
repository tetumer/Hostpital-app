import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"))
    if (!loggedInUser) {
      navigate("/login")
    } else {
      setUser(loggedInUser)
    }
  }, [])

  if (!user) {
    return <p>Checking login...</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}</h2>
      <p>Role: {user.role}</p>

      {(user.role === "Owner") && (
        <p>Revenue: $12,000</p>
      )}

      {(user.role === "Receptionist" || user.role === "Owner") && (
        <Link to="/reception">Go to Work Pages</Link>
      )}
      {(user.role === "Doctor") && (
            <div>
                <p>Total Patients: 42</p>
                <p>Today's Appointments: 5</p>
            </div>
      )}

    </div>
  )
}
export default Dashboard