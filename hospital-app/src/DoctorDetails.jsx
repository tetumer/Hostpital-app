import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function DoctorDetails() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    fetch(`https://localhost:7172/api/doctor/${id}`)
      .then((response) => response.json())
      .then((data) => setDoctor(data))
  }, [id])

  return (
    <div>
      <h1>Doctor Details</h1>
      {doctor && (
        <div>
          <p>Name: {doctor.name}</p>
          <p>Date of Birth: {doctor.dateOfBirth}</p>
          <p>Gender: {doctor.gender}</p>
          <p>Specialization: {doctor.specialization}</p>
          <p>Phone: {doctor.phone}</p>
          <p>Email: {doctor.email}</p>
          <p>Address: {doctor.address}</p>
          <p>License Number: {doctor.licenseNumber}</p>
          <p>Department: {doctor.department}</p>
          <p>Availability: {doctor.availability}</p>
        </div>
      )}
      <Link to="/doctors">Back to list</Link>
    </div>
  )
}

export default DoctorDetails