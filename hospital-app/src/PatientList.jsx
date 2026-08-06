import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PatientList() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        age: 30,
        assignedDoctor: "Dr. Ahmed",
        status: "Outpatient",
      }))
      setPatients(formatted)
      setLoading(false)
    })
}, [])

  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [editingId, setEditingId] = useState(null)

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddPatient = () => {
    const newPatient = { id: Date.now(), name: name, age: age }
    setPatients([...patients, newPatient])
    setName("")
    setAge("")
  }

  const handleDeletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id))
  }

  const startEditing = (patient) => {
    setEditingId(patient.id)
    setName(patient.name)
    setAge(patient.age)
  }

  const handleUpdatePatient = () => {
    setPatients(
      patients.map((patient) =>
        patient.id === editingId ? { ...patient, name: name, age: age } : patient
      )
    )
    setEditingId(null)
    setName("")
    setAge("")
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
              {patient.name} — {patient.age} years
            </Link>
            <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
            <button onClick={() => startEditing(patient)}>Edit</button>

            {hoveredId === patient.id && (
              <div style={{ border: '1px solid black', padding: '5px' }}>
                <p>Doctor: {patient.assignedDoctor}</p>
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
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