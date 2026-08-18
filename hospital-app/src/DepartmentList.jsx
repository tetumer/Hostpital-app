import { useState, useEffect } from 'react'

function DepartmentList() {
    const [departments, setDepartments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7172/api/department')
                .then(response => response.json()),

            fetch('https://localhost:7172/api/doctor')
                .then(response => response.json())
        ])
            .then(([departmentsData, doctorsData]) => {
                setDepartments(departmentsData)
                setDoctors(doctorsData)
                setLoading(false)
            })
            .catch(error => {
                console.error("DEPARTMENT ERROR:", error)
                setLoading(false)
            })
    }, [])

    const filteredDepartments = departments.filter(department =>
        department.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <div className="container py-4">
                <p className="text-muted">
                    Loading departments...
                </p>
            </div>
        )
    }

    return (
        <div className="container py-4">

            <div className="mb-4">
                <h1 className="fw-bold mb-1">
                    Departments
                </h1>

                <p className="text-muted mb-0">
                    Browse hospital departments and their doctors.
                </p>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">

                    <label className="form-label fw-semibold">
                        Search Departments
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>
            </div>

            <div className="row g-3">

                {filteredDepartments.length === 0 ? (

                    <div className="col-12">

                        <div className="alert alert-light border text-muted">
                            No departments found.
                        </div>

                    </div>

                ) : (

                    filteredDepartments.map(department => {

                        const departmentDoctors = doctors.filter(
                            doctor =>
                                doctor.department?.toLowerCase() ===
                                department.name?.toLowerCase()
                        )

                        const isSelected =
                            selectedDepartment === department.id

                        return (

                            <div
                                key={department.id}
                                className="col-12"
                            >

                                <div
                                    className={`card shadow-sm ${isSelected
                                            ? 'border-primary'
                                            : ''
                                        }`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setSelectedDepartment(
                                            isSelected
                                                ? null
                                                : department.id
                                        )
                                    }
                                >

                                    <div className="card-body">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <h4 className="fw-semibold mb-1">
                                                    {department.name}
                                                </h4>

                                                <span className="text-muted">
                                                    {departmentDoctors.length}{' '}

                                                    {departmentDoctors.length === 1
                                                        ? 'Doctor'
                                                        : 'Doctors'}
                                                </span>

                                            </div>

                                            <span
                                                className={`badge ${isSelected
                                                        ? 'bg-primary'
                                                        : 'bg-light text-dark'
                                                    }`}
                                            >
                                                {isSelected
                                                    ? 'Hide'
                                                    : 'View'}
                                            </span>

                                        </div>

                                    </div>

                                    {isSelected && (

                                        <div className="border-top">

                                            <div className="card-body">

                                                <h5 className="fw-semibold mb-3">
                                                    Doctors
                                                </h5>

                                                {departmentDoctors.length === 0 ? (

                                                    <p className="text-muted mb-0">
                                                        No doctors in this department.
                                                    </p>

                                                ) : (

                                                    <div className="row g-3">

                                                        {departmentDoctors.map(doctor => (

                                                            <div
                                                                key={doctor.id}
                                                                className="col-12 col-md-6"
                                                            >

                                                                <div className="border rounded p-3 h-100">

                                                                    <div className="d-flex justify-content-between align-items-start mb-2">

                                                                        <h6 className="fw-semibold mb-0">
                                                                            {doctor.name}
                                                                        </h6>

                                                                        <span
                                                                            className={`badge ${doctor.availability
                                                                                    ? 'bg-success'
                                                                                    : 'bg-secondary'
                                                                                }`}
                                                                        >
                                                                            {doctor.availability
                                                                                ? 'Available'
                                                                                : 'Not Available'}
                                                                        </span>

                                                                    </div>

                                                                    <p className="text-muted mb-0">

                                                                        <strong>
                                                                            Specialization:
                                                                        </strong>{' '}

                                                                        {doctor.specialization}

                                                                    </p>

                                                                </div>

                                                            </div>

                                                        ))}

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        )
                    })

                )}

            </div>

        </div>
    )
}

export default DepartmentList