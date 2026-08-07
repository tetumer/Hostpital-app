import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PrescriptionList() {
    const [prescriptions,setPrescriptions] = useState([])
    const [doctors,setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [patients,setPatients] = useState([])
    const [prescriptionForm,setPrescriptionForm] = useState({
    patientId: "",
    doctorId: "",
    medicine:"",
    dosage: "",
    duration: "",
})


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

    if (loading) {
    return <p>Loading Page...</p>
  }

    const handleAddPrescriptions = () => {
    const newPrescriptions = {patientId: prescriptionForm.patientId, doctorId: prescriptionForm.doctorId, medicine:  prescriptionForm.medicine , dosage: prescriptionForm.dosage, duration: prescriptionForm.duration  }
    setPrescriptions([...prescriptions, newPrescriptions])
    setPrescriptionForm({
        patientId: "",
        doctorId: "",
        medicine: "",
        dosage: "",
        duration: "",
    })
  }

  return (
    <div>
      <h1>Make prescirption</h1>

  
    <select
        value={prescriptionForm.doctorId}
        onChange={(e) =>
            setPrescriptionForm({
                ...prescriptionForm,
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
        value={prescriptionForm.patientId}
        onChange={(e) =>
            setPrescriptionForm({
                ...prescriptionForm,
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
        type="text"
        value={prescriptionForm.medicine}
        onChange={(e) =>
            setPrescriptionForm({
                ...prescriptionForm,
                medicine: e.target.value
            })
        }
    />

    <input
        type="text"
        value={prescriptionForm.dosage}
        onChange={(e) =>
            setPrescriptionForm({
                ...prescriptionForm,
                dosage: e.target.value
            })
        }
    />
    <input
        type="text"
        value={prescriptionForm.duration}
        onChange={(e) =>
            setPrescriptionForm({
                ...prescriptionForm,
                duration: e.target.value
            })
        }
    />

    <button onClick={handleAddPrescriptions}>Add Prescription</button>

    <div>
      <h2>Pescriontions</h2>
      <ul>
        {prescriptions.map((appt) => {
          const patient = patients.find((p) => p.id === Number(appt.patientId))
          const doctor = doctors.find((d) => d.id === Number(appt.doctorId))
          return (
            <li key={appt.id}>
              {patient?.name} with {doctor?.name} — {appt.medicine} at {appt.dosage} — {appt.duration}
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}

export default PrescriptionList

