import { useState, useEffect } from 'react'
import AppointmentForm from './AppointmentForm'
import AppointmentList from './AppointmentList'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [patientId, setPatientId] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [status, setStatus] = useState("")
  const [formKey, setFormKey] = useState(0)

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

    useEffect(() => {
    fetch('https://localhost:7172/api/appointment')
    .then((response) => response.json())
    .then((data) => {
      setAppointments(data)
    })
    }, [])

const handleAddAppointment = (newAppointment) => {
  fetch('https://localhost:7172/api/appointment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientId: Number(newAppointment.patientId),
      doctorId: Number(newAppointment.doctorId),
      date: newAppointment.date,
      time: newAppointment.time,
      status: newAppointment.status
    })
  })
    .then(async (response) => {
      if (!response.ok) {
        const message = await response.text()
        throw new Error(message)
      }

      return response.json()
    })
    .then((data) => {
      setAppointments([...appointments, data])
      setFormKey(formKey + 1)
    })
    .catch((error) => {
      alert(error.message)
    })
}
    const handleUpdateAppointment = () => {
    fetch(`https://localhost:7172/api/appointment/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, patientId: patientId, doctorId: doctorId, date: date, time: time, status: status })
    })
      .then((response) => response.json())
      .then((updatedAppointment) => {
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === editingId ? updatedAppointment : appointment
          )
        )
          setAppointment({
          patientId: "",
          doctorId: "",
          date: "",
          time: "",
          status: "Scheduled"
        })
      })
  }
      const handleDeleteAppointment = (id) => {
    fetch(`https://localhost:7172/api/appointment/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setAppointments(appointments.filter((appointment) => appointment.id !== id))
      })

    }



  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <AppointmentList appointments={appointments} patients={patients} doctors={doctors} onDelete={handleDeleteAppointment} onUpdate={handleUpdateAppointment} />
      <AppointmentForm onAdd={handleAddAppointment} patients={patients} doctors={doctors} key={formKey} />
    </div>
  )
}

export default Appointments