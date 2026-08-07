import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PatientList() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetch('https://localhost:7172/api/patient')
      .then((response) => response.json())
      .then((data) => {
        setPatients(data)
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
      fetch('https://localhost:7172/api/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, age: age })
      })
        .then((response) => response.json())
        .then((data) => {
          setPatients([...patients, data])
          setName("")
          setAge("")
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
    setName(patient.name)
    setAge(patient.age)
  }

    const handleUpdatePatient = () => {
      fetch(`https://localhost:7172/api/patient/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, name: name, age: age })
      })
        .then((response) => response.json())
        .then((updatedPatient) => {
          setPatients(
            patients.map((patient) =>
              patient.id === editingId ? updatedPatient : patient
            )
          )
          setEditingId(null)
          setName("")
          setAge("")
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