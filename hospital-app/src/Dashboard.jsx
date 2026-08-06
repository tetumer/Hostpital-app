import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
function Dashboard(){
    const [role,setRole] = useState()
    const dashboard = {}

    return(
    <div>
  {dashboard.totalPatients && (
    <PatientCard total={dashboard.totalPatients} />
  )}

  {dashboard.revenue && (
    <RevenueCard revenue={dashboard.revenue} />
  )}

  {dashboard.appointments && (
    <AppointmentCard data={dashboard.appointments} />
  )}
</div>


)


}

export default Dashboard