import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
function Reception(){
 

    return(
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