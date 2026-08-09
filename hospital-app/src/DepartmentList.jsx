import { useState, useEffect } from 'react'

function DepartmentList() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  useEffect(() => {
    fetch('https://localhost:7172/api/doctor')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
  }, [])

  const departments = [...new Set(
    doctors.map((doctor) => doctor.department)
  )]

  const filteredDepartments = departments.filter((department) =>
    department?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <p>Loading departments...</p>
  }

  return (
    <div>
      <h1>Departments</h1>

      <input
        type="text"
        placeholder="Search department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filteredDepartments.map((department) => {

          const departmentDoctors = doctors.filter(
            (doctor) => doctor.department === department
          )

          const isSelected = selectedDepartment === department

          return (
            <div
              key={department}
              onClick={() =>
                setSelectedDepartment(
                  isSelected ? null : department
                )
              }
              style={{
                border: '1px solid black',
                padding: '15px',
                margin: '10px 0',
                cursor: 'pointer'
              }}
            >
              <h2>{department}</h2>

              <p>
                {departmentDoctors.length}{' '}
                {departmentDoctors.length === 1
                  ? 'Doctor'
                  : 'Doctors'}
              </p>

              {isSelected && (
                <div>
                  <h3>Doctors</h3>

                  {departmentDoctors.map((doctor) => (
                    <div key={doctor.id}>
                      <p>
                        <strong>{doctor.name}</strong>
                      </p>

                      <p>
                        Specialization: {doctor.specialization}
                      </p>

                      <p>
                        Availability:{' '}
                        {doctor.availability
                          ? 'Available'
                          : 'Not Available'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DepartmentList