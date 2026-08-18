import { useState, useEffect } from 'react'
import AppointmentForm from './AppointmentForm'
import AppointmentList from './AppointmentList'
import NavBar from './NavBar'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [role, setRole] = useState(null)

  const [loading, setLoading] = useState(true)

  const [editingId, setEditingId] = useState(null)
  const [patientId, setPatientId] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [status, setStatus] = useState("")
  const [formKey, setFormKey] = useState(0)


  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    const headers = {
      Authorization: `Bearer ${ token } `
    }


    fetch('https://localhost:7172/api/dashboard', {
      headers
    })
      .then(async (response) => {

        if (!response.ok) {
          throw new Error("Could not get user information.")
        }

        return response.json()
      })
      .then((data) => {

        setRole(data.welcome.role)

      })
      .catch((error) => {

        console.error("ROLE ERROR:", error)

      })


    fetch('https://localhost:7172/api/appointment', {
      headers
    })
      .then(async (response) => {

        if (!response.ok) {
          throw new Error("Could not load appointments.")
        }

        return response.json()
      })
      .then((data) => {

        setAppointments(data)

      })
      .catch((error) => {

        console.error("APPOINTMENT ERROR:", error)

      })



    fetch('https://localhost:7172/api/patient', {
      headers
    })
      .then(async (response) => {

        if (!response.ok) {
          throw new Error("Could not load patients.")
        }

        return response.json()
      })
      .then((data) => {

        setPatients(data)

      })
      .catch((error) => {

        console.error("PATIENT ERROR:", error)

      })


    fetch('https://localhost:7172/api/doctor', {
      headers
    })
      .then(async (response) => {

        if (!response.ok) {
          throw new Error("Could not load doctors.")
        }

        return response.json()
      })
      .then((data) => {

        setDoctors(data)

      })
      .catch((error) => {

        console.error("DOCTOR ERROR:", error)

      })
      .finally(() => {

        setLoading(false)

      })

  }, [])


  const handleAddAppointment = (newAppointment) => {

    const token = localStorage.getItem("token")

    fetch('https://localhost:7172/api/appointment', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token } `
      },

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

        setAppointments((current) => [
          ...current,
          data
        ])

        setFormKey((current) => current + 1)

      })

      .catch((error) => {

        alert(error.message)

      })

  }


  const handleUpdateAppointment = () => {

    const token = localStorage.getItem("token")

    fetch(
      `https://localhost:7172/api/appointment/${editingId}`,
{

    method: 'PUT',

        headers: {
        'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
        id: editingId,
        patientId: Number(patientId),
        doctorId: Number(doctorId),
        date: date,
        time: time,
        status: status
    })

}
    )

      .then(async (response) => {

    if (!response.ok) {

        const message = await response.text()

        throw new Error(message)

    }

    return response.json()

})

    .then((updatedAppointment) => {

        setAppointments((current) =>
            current.map((appointment) =>
                appointment.id === editingId
                    ? updatedAppointment
                    : appointment
            )
        )

        setEditingId(null)
        setPatientId("")
        setDoctorId("")
        setDate("")
        setTime("")
        setStatus("")

    })

    .catch((error) => {

        alert(error.message)

    })

  }


const handleDeleteAppointment = (id) => {

    const token = localStorage.getItem("token")

    fetch(
        `https://localhost:7172/api/appointment/${id}`,
        {

            method: 'DELETE',

            headers: {
                Authorization: `Bearer ${token}`
            }

        }
    )

        .then(async (response) => {

            if (!response.ok) {

                const message = await response.text()

                throw new Error(message)

            }

        })

        .then(() => {

            setAppointments((current) =>
                current.filter(
                    (appointment) => appointment.id !== id
                )
            )

        })

        .catch((error) => {

            alert(error.message)

        })

}


if (loading || !role) {

    return (

        <div>

            <NavBar />

            <p>Loading...</p>

        </div>

    )

}



const canCreate = role === "Owner" || role === "Receptionist"

const canEdit = role === "Owner" || role === "Receptionist"

const canDelete = role === "Owner"


return (

    <div>

        <NavBar />



        {canCreate && (

            <AppointmentForm
                onAdd={handleAddAppointment}
                patients={patients}
                doctors={doctors}
                key={formKey}
            />

        )}




        <AppointmentList

            appointments={appointments}

            patients={patients}

            doctors={doctors}

            onDelete={
                canDelete
                    ? handleDeleteAppointment
                    : undefined
            }

            onUpdate={
                canEdit
                    ? handleUpdateAppointment
                    : undefined
            }

        />

    </div>

)

}

export default Appointments
