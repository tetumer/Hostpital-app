import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Reception() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user || user.role === "Doctor") {
      navigate("/dashboard")
    }
  }, [])

  return (
    <div>
        <Link to={`/doctors/`}>Doctor</Link>
        <Link to={`/patients/`}>Patients</Link>  
        <Link to={`/appointments/`}>Appointments</Link>
        <Link to={`/departments/`}>Departments</Link>
        <Link to={`/prescriptions/`}>Prescription</Link>   
        <Link to={`/labreports/`}>LabReports</Link>  
        <Link to={`/dashboard/`}>Dashboard</Link>
        <Link to={`/bill/`}>Bill</Link>
    </div>
  )
}
export default Reception