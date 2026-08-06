import { useParams, Link } from 'react-router-dom'

function DoctorDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Doctor Details</h1>
      <p>Doctor ID: {id}</p>
      <Link to="/doctors">Back to list</Link>
    </div>
  )
}

export default DoctorDetails