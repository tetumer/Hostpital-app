import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PatientDetails() {
  const { id } = useParams()
  const [patient, setPatient] = useState(null)


  useEffect(() => {
    fetch(`https://localhost:7172/api/patient/${id}`)
      .then((response) => response.json())
      .then((data) => setPatient(data))
  }, [id])

  return (
    <div>
      <h1>Patient Details</h1>
      {patient && (
        <div>
          <p>Name: {patient.name}</p>
          <p>Date of Birth: {patient.dateOfBirth}</p>
          <p>Gender: {patient.gender}</p>
          <p>Blood Group: {patient.bloodGroup}</p>
          <p>Status: {patient.status}</p>
          <p>Admission Date: {patient.admissionDate}</p>
          <p>Allergies: {patient.allergies}</p>
          <p>Medical History: {patient.medicalHistory}</p>
          <p>Phone: {patient.phone}</p>
          <p>Address: {patient.address}</p>
          <p>Emergency Contact: {patient.emergencyContact}</p>
          <p>Insurance Provider: {patient.provider}</p>
          <p>Policy Number: {patient.policyNumber}</p>
          <p>Coverage: {patient.coverage}</p>
        </div>
      )}
      <Link to="/patients">Back to list</Link>
    </div>
  )
}

export default PatientDetails