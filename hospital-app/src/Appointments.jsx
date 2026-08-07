import { useState, useEffect } from 'react'
import AppointmentForm from './AppointmentForm'
import AppointmentList from './AppointmentList'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      fetch('https://localhost:7172/api/patient')
        .then((response) => response.json())
        .then((data) => {
          setPatients(data)
        })
    }, [])

    useEffect(() => {
      fetch('https://localhost:7172/api/doctor')
        .then((response) => response.json())
        .then((data) => {
          setDoctors(data)
          setLoading(false)
        })
    }, [])

  const handleAddAppointment = (newAppointment) => {
    setAppointments([
      ...appointments,
      { ...newAppointment, id: Date.now() }
    ])
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <AppointmentForm
        onAdd={handleAddAppointment}
        patients={patients}
        doctors={doctors}
      />

      <AppointmentList
        appointments={appointments}
        patients={patients}
        doctors={doctors}
      />
    </div>
  )
}

export default Appointments