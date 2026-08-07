import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DoctorList() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetch('https://localhost:7172/api/doctor')
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          specialization: item.specialization,
          availability: item.availability,
        }))
        setDoctors(formatted)
        setLoading(false)
      })
  }, [])
  

  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [editingId, setEditingId] = useState(null)

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddDoctor = () => {
    const newDoctor = { id: Date.now(), name: name, specialization: specialization, availability: "Available" }
    setDoctors([...doctors, newDoctor])
    setName("")
    setSpecialization("")
  }

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id))
  }

  const startEditing = (doctor) => {
    setEditingId(doctor.id)
    setName(doctor.name)
    setSpecialization(doctor.specialization)
  }

  const handleUpdateDoctor = () => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === editingId ? { ...doctor, name: name, specialization: specialization } : doctor
      )
    )
    setEditingId(null)
    setName("")
    setSpecialization("")
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