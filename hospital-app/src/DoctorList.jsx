import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DoctorList() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)
  const [age, setAge] = useState("")
  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetch('https://localhost:7172/api/doctor')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
  }, [])

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddDoctor = () => {
  fetch('https://localhost:7172/api/doctor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, age: Number(age), specialization: specialization, availability: "Available" })
  })
    .then((response) => response.json())
    .then((data) => {
      setDoctors([...doctors, data])
      setName("")
      setAge("")
      setSpecialization("")
    })
}

    const handleDeleteDoctor = (id) => {
    fetch(`https://localhost:7172/api/doctor/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setDoctors(doctors.filter((doctor) => doctor.id !== id))
      })

    }

  const startEditing = (doctor) => {
    setEditingId(doctor.id)
    setName(doctor.name)
    setAge(doctor.age)
    setSpecialization(doctor.specialization)
  }

  const handleUpdateDoctor = () => {
    fetch(`https://localhost:7172/api/doctor/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, name: name, age: age, specialization: specialization })
    })
      .then((response) => response.json())
      .then((updatedDoctor) => {
        setDoctors(
          doctors.map((doctor) =>
            doctor.id === editingId ? updatedDoctor : doctor
          )
        )
        setEditingId(null)
        setName("")
        setAge("")
        setSpecialization("")
      })
  }

  const handleToggleAvailability = (doctorId, currentAvailability) => {
    const newAvailability = currentAvailability === "Available" ? "Not Available" : "Available"
    fetch(`https://localhost:7172/api/doctor/${doctorId}/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability: newAvailability })
    })
      .then((response) => response.json())
      .then((updatedDoctor) => {
        setDoctors(
          doctors.map((doctor) =>
            doctor.id === doctorId ? updatedDoctor : doctor
          )
        )
      })
  }

  if (loading) {
    return <p>Loading doctors...</p>
  }

  return (
    <div>
      <h1>Doctor List</h1>

      <input
        type="text"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredDoctors.map((doctor) => (
          <li
            key={doctor.id}
            onMouseEnter={() => setHoveredId(doctor.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: 'relative' }}
          >
            <Link to={`/doctors/${doctor.id}`}>
              {doctor.name} — {doctor.specialization}
            </Link>
            <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
            <button onClick={() => startEditing(doctor)}>Edit</button>

            {hoveredId === doctor.id && (
              <div style={{ border: '1px solid black', padding: '5px' }}>
                <p>Availability: {doctor.availability}</p>
                <button onClick={() => handleToggleAvailability(doctor.id, doctor.availability)}>
                  Toggle Availability
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Doctor" : "Add Doctor"}</h2>
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
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      {editingId ? (
        <button onClick={handleUpdateDoctor}>Update Doctor</button>
      ) : (
        <button onClick={handleAddDoctor}>Add Doctor</button>
      )}
    </div>
  )
}

export default DoctorList