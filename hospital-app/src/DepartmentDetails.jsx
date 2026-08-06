import { useParams, Link } from 'react-router-dom'

function DepartmentDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Department Details</h1>
      <p>Department ID: {id}</p>
      <Link to="/departments">Back to list</Link>
    </div>
  )
}

export default DepartmentDetails