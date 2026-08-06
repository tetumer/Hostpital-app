import { useParams, Link } from 'react-router-dom'

function PatientDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Patient ID: {id}</p>
      <Link to="/patients">Back to list</Link>
    </div>
  )
}

export default PatientDetails