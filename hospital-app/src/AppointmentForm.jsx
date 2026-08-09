import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AppointmentForm({  onAdd, patients, doctors }) {
    const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "Scheduled"
})

  return (
    <div>
      <h1>Make an appointment</h1>

  
    <select
        value={appointment.doctorId}
        onChange={(e) =>
            setAppointment({
                ...appointment,
                doctorId: e.target.value
            })
        }
    >
        <option value="">Select Doctor</option>

        {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
                {doctor.name}
            </option>
        ))}
    </select>
    <select
        value={appointment.patientId}
        onChange={(e) =>
            setAppointment({
                ...appointment,
                patientId: e.target.value
            })
        }
    >
        <option value="">Select Patient</option>

        {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
                {patient.name}
            </option>
        ))}
    </select>
    <input
        type="date"
        value={appointment.date}
        onChange={(e) =>
            setAppointment({
                ...appointment,
                date: e.target.value
            })
        }
    />

    <input
        type="time"
        value={appointment.time}
        onChange={(e) =>
            setAppointment({
                ...appointment,
                time: e.target.value
            })
        }
    />

    <select
        value={appointment.status}
        onChange={(e) =>
            setAppointment({
            ...appointment,
            status: e.target.value
            })
        }
        >
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
    </select>
    

    <button onClick={() => onAdd(appointment)}>Book Appointment</button>
    </div>
  )
    



}

export default AppointmentForm

