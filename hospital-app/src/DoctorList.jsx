import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DoctorList() {
  const [doctors, setDoctors] = useState([])
  const [doctorForm, setDoctorForm] = useState({
    name: "", dateOfBirth: "", specialization: "", 
    gender: "", phone: "", email: "", address: "",
    licenseNumber: "", department: "", arrivalTime: "",
    departureTime: "",
    availability: ""
  })
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)
  const [search, setSearch] = useState("")
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
  doctor.name?.toLowerCase().includes(search.toLowerCase())
 )

  const handleAddDoctor = () => {
  fetch('https://localhost:7172/api/doctor', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          name: doctorForm.name, dateOfBirth: doctorForm.dateOfBirth, specialization: doctorForm.specialization, gender: doctorForm.gender, phone: doctorForm.phone, email: doctorForm.email, address: doctorForm.address, licenseNumber: doctorForm.licenseNumber, department: doctorForm.department, arrivalTime: doctorForm.arrivalTime, departureTime: doctorForm.departureTime       
      })
  })
    .then((response) => response.json())
    .then((data) => {
      setDoctors([...doctors, data])
      setDoctorForm({
        name: "",
        dateOfBirth: "",
        specialization: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        licenseNumber: "",
        arrivalTime: "",
        departureTime: "",
        department: "",
        availability: ""
      })
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
    setDoctorForm({
      name: doctor.name,
      dateOfBirth: doctor.dateOfBirth,
      gender: doctor.gender,
      phone: doctor.phone,
      email: doctor.email,
      address: doctor.address,
      licenseNumber: doctor.licenseNumber,
      department: doctor.department,
      arrivalTime: doctor.arrivalTime,
      departureTime: doctor.departureTime,
      specialization: doctor.specialization,
      availability: doctor.availability

    })
  }

  const handleUpdateDoctor = () => {
    fetch(`https://localhost:7172/api/doctor/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...doctorForm })
    })
      .then((response) => response.json())
      .then((updatedDoctor) => {
        setDoctors(
          doctors.map((doctor) =>
            doctor.id === editingId ? updatedDoctor : doctor
          )
        )
        setEditingId(null)
        setDoctorForm({
          name: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          licenseNumber: "",
          department: "",
          availability: "",
          arrivalTime: "",
          departureTime: "",
          specialization: "",
        })
      })
  }


  const handleToggleAvailability = (doctorId) => {
  fetch(`https://localhost:7172/api/doctor/${doctorId}/availability`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
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
                <button onClick={() => handleToggleAvailability(doctor.id)}>
                     {doctor.availability ? "Available" : "Not Available"}
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
        value={doctorForm.name}
        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={doctorForm.dateOfBirth}
        onChange={(e) => setDoctorForm({ ...doctorForm, dateOfBirth: e.target.value })}
      />
      <input
        type="text"
        placeholder="Specialization"
        value={doctorForm.specialization}
        onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
      />
            <input
            type="text"
            placeholder="gender"
            value={doctorForm.gender}
            onChange={(e) => setDoctorForm({ ...doctorForm, gender: e.target.value })}
      />
        <input
                  type="text"
                  placeholder="Phone"
                  value={doctorForm.phone}
                  onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
      />
      <input
                  type="text"
                  placeholder="Email"
                  value={doctorForm.email}
                  onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
      />  
      <input
                  type="text"
                  placeholder="Address"
                  value={doctorForm.address}
                  onChange={(e) => setDoctorForm({ ...doctorForm, address: e.target.value })}
      />
      <input
                  type="time"
                  placeholder="Arrival Time"
                  value={doctorForm.arrivalTime}
                  onChange={(e) => setDoctorForm({ ...doctorForm, arrivalTime: e.target.value })}
       />
       <input
                  type="time"
                  placeholder="Departure Time"
                  value={doctorForm.departureTime}
                  onChange={(e) => setDoctorForm({ ...doctorForm, departureTime: e.target.value })}
      />
      <input
                  type="text"
                  placeholder="License Number"
                  value={doctorForm.licenseNumber}
                  onChange={(e) => setDoctorForm({ ...doctorForm, licenseNumber: e.target.value })}
      />
      <input
                  type="text"
                  placeholder="Department"
                  value={doctorForm.department}
                  onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })}
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