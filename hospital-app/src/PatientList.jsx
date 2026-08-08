import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PatientList() {
  const [patients, setPatients] = useState([])
  const [patientForm, setPatientForm] = useState({
    name: "", dateOfBirth: "", bloodGroup: "", status: "",
    admissionDate: "", allergies: "", medicalHistory: "",
    phone: "", address: "", emergencyContact: "",
    gender: "", provider: "", policyNumber: "", coverage: ""
  })

  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

  const emptyForm = {
    name: "", dateOfBirth: "", bloodGroup: "", status: "",
    admissionDate: "", allergies: "", medicalHistory: "",
    phone: "", address: "", emergencyContact: "",
    gender: "", provider: "", policyNumber: "", coverage: ""
  }

  useEffect(() => {
    fetch('https://localhost:7172/api/patient')
      .then((response) => response.json())
      .then((data) => {
        setPatients(data)
        setLoading(false)
      })
  }, [])

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddPatient = () => {
    fetch('https://localhost:7172/api/patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientForm)
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients([...patients, data])
        setPatientForm(emptyForm)
      })
  }

  const handleDeletePatient = (id) => {
    fetch(`https://localhost:7172/api/patient/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPatients(patients.filter((patient) => patient.id !== id))
      })
  }

  const startEditing = (patient) => {
    setEditingId(patient.id)
    setPatientForm(patient)
  }

  const handleUpdatePatient = () => {
    fetch(`https://localhost:7172/api/patient/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...patientForm })
    })
      .then((response) => response.json())
      .then((updatedPatient) => {
        setPatients(
          patients.map((patient) =>
            patient.id === editingId ? updatedPatient : patient
          )
        )
        setEditingId(null)
        setPatientForm(emptyForm)
      })
  }

  if (loading) {
    return <p>Loading patients...</p>
  }

  return (
    <div>
      <h1>Patient List</h1>

      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredPatients.map((patient) => (
          <li
            key={patient.id}
            onMouseEnter={() => setHoveredId(patient.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: 'relative' }}
          >
            <Link to={`/patients/${patient.id}`}>
              {patient.name} — {patient.dateOfBirth}
            </Link>
            <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
            <button onClick={() => startEditing(patient)}>Edit</button>

            {hoveredId === patient.id && (
              <div style={{ border: '1px solid black', padding: '5px' }}>
                <p>Status: {patient.status}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Patient" : "Add Patient"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={patientForm.name}
        onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={patientForm.dateOfBirth}
        onChange={(e) => setPatientForm({ ...patientForm, dateOfBirth: e.target.value })}
      />
      <input
        type="text"
        placeholder="Blood Group"
        value={patientForm.bloodGroup}
        onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={patientForm.status}
        onChange={(e) => setPatientForm({ ...patientForm, status: e.target.value })}
      />
      <input
        type="date"
        placeholder="Admission Date"
        value={patientForm.admissionDate}
        onChange={(e) => setPatientForm({ ...patientForm, admissionDate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Allergies"
        value={patientForm.allergies}
        onChange={(e) => setPatientForm({ ...patientForm, allergies: e.target.value })}
      />
      <input
        type="text"
        placeholder="Medical History"
        value={patientForm.medicalHistory}
        onChange={(e) => setPatientForm({ ...patientForm, medicalHistory: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={patientForm.phone}
        onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={patientForm.address}
        onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Emergency Contact"
        value={patientForm.emergencyContact}
        onChange={(e) => setPatientForm({ ...patientForm, emergencyContact: e.target.value })}
      />
      <input
        type="text"
        placeholder="Gender"
        value={patientForm.gender}
        onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
      />
      <input
        type="text"
        placeholder="Insurance Provider"
        value={patientForm.provider}
        onChange={(e) => setPatientForm({ ...patientForm, provider: e.target.value })}
      />
      <input
        type="text"
        placeholder="Policy Number"
        value={patientForm.policyNumber}
        onChange={(e) => setPatientForm({ ...patientForm, policyNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Coverage"
        value={patientForm.coverage}
        onChange={(e) => setPatientForm({ ...patientForm, coverage: e.target.value })}
      />

      {editingId ? (
        <button onClick={handleUpdatePatient}>Update Patient</button>
      ) : (
        <button onClick={handleAddPatient}>Add Patient</button>
      )}
    </div>
  )
}

export default PatientList