import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DepartmentList() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

useEffect(() => {
  fetch('https://localhost:7172/api/department')
    .then((response) => response.json())
    .then((data) => {
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        status: "Good",
      }))
      setDepartments(formatted)
      setLoading(false)
    })
}, [])

  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [editingId, setEditingId] = useState(null)

  const filteredDepartment= departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddDepartment = () => {
    const newDepartment = { id: Date.now(), name: name }
    setDepartments([...departments, newDepartment])
    setName("")
  }

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((department) => department.id !== id))
  }

  const startEditing = (department) => {
    setEditingId(department.id)
    setName(department.name)
  }

  const handleUpdateDepartment = () => {
    setDepartments(
      departments.map((department) =>
        department.id === editingId ? { ...department, name: name} : department
      )
    )
    setEditingId(null)
    setName("")
  }

  if (loading) {
    return <p>Loading Department...</p>
  }
  return (
    <div>
      <h1>Department List</h1>

      <input
        type="text"
        placeholder="Search Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredDepartment.map((department) => (
          <li
            key={department.id}
            onMouseEnter={() => setHoveredId(department.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: 'relative' }}
          >
            <Link to={`/departments/${department.id}`}>
              {department.name} — {department.status} 
            </Link>
            <button onClick={() => handleDeleteDepartment(department.id)}>Delete</button>
            <button onClick={() => startEditing(department)}>Edit</button>

            {hoveredId === department.id && (
              <div style={{ border: '1px solid black', padding: '5px' }}>
                <p>Department: {department.name}</p>
                <p>Status: {department.status}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Department" : "Add Department"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {editingId ? (
        <button onClick={handleUpdateDepartment}>Update Department</button>
      ) : (
        <button onClick={handleAddDepartment}>Add Department</button>
      )}
    </div>
  )
}

export default DepartmentList