import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function DoctorList() {
    const [doctors, setDoctors] = useState([])
    const [accessDenied, setAccessDenied] = useState(false)

    const [doctorForm, setDoctorForm] = useState({
        name: "",
        dateOfBirth: "",
        specialization: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        licenseNumber: "",
        department: "",
        arrivalTime: "",
        departureTime: "",
        availability: ""
    })

    const [editingId, setEditingId] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const emptyForm = {
        name: "",
        dateOfBirth: "",
        specialization: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        licenseNumber: "",
        department: "",
        arrivalTime: "",
        departureTime: "",
        availability: ""
    }

    const getRoleFromToken = (token) => {
        if (!token) return null

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))

            return (
                payload[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] ||
                payload.role
            )
        } catch {
            return null
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch('https://localhost:7172/api/doctor', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {

                if (!response.ok) {

                    if (
                        response.status === 401 ||
                        response.status === 403
                    ) {
                        setAccessDenied(true)
                        setLoading(false)
                        return null
                    }

                    const message = await response.text()
                    throw new Error(message)
                }

                return response.json()
            })
            .then((data) => {

                if (!data) return

                setDoctors(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Failed to load doctors:", error)
                setLoading(false)
            })

    }, [])

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name?.toLowerCase().includes(search.toLowerCase())
    )

    const role = getRoleFromToken(
        localStorage.getItem("token")
    )

    const canManage = role === "Owner" || role === "Receptionist"
    const canDelete = role === "Owner"
    const canToggleAvailability =
        role === "Owner" || role === "Receptionist"

    const handleAddDoctor = () => {

        fetch('https://localhost:7172/api/doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(doctorForm)
        })
            .then(async (response) => {

                const data = await response.json()

                if (!response.ok) {
                    console.log("Doctor creation failed:", data)
                    return
                }

                setDoctors([
                    ...doctors,
                    data.doctor
                ])

                setDoctorForm(emptyForm)
            })
    }

    const handleDeleteDoctor = (id) => {

        if (!window.confirm("Are you sure you want to delete this doctor?")) {
            return
        }

        fetch(`https://localhost:7172/api/doctor/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(async (response) => {

                if (!response.ok) {
                    const message = await response.text()
                    console.log("Doctor deletion failed:", message)
                    return
                }

                setDoctors(
                    doctors.filter(
                        (doctor) => doctor.id !== id
                    )
                )
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

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
    }

    const handleUpdateDoctor = () => {

        fetch(`https://localhost:7172/api/doctor/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                id: editingId,
                ...doctorForm
            })
        })
            .then(async (response) => {

                const data = await response.json()

                if (!response.ok) {
                    console.log("Doctor update failed:", data)
                    return
                }

                setDoctors(
                    doctors.map((doctor) =>
                        doctor.id === editingId
                            ? data
                            : doctor
                    )
                )

                setEditingId(null)
                setDoctorForm(emptyForm)
            })
    }

    const handleToggleAvailability = (doctorId) => {

        fetch(
            `https://localhost:7172/api/doctor/${doctorId}/availability`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(async (response) => {

                const data = await response.json()

                if (!response.ok) {
                    console.log(
                        "Availability update failed:",
                        data
                    )
                    return
                }

                setDoctors(
                    doctors.map((doctor) =>
                        doctor.id === doctorId
                            ? data
                            : doctor
                    )
                )
            })
    }

    if (loading) {
        return (
            <div className="container py-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-muted mt-3">
                        Checking access...
                    </p>

                </div>

            </div>
        )
    }

    if (accessDenied) {
        return (
            <>
                <NavBar />

                <div className="container py-5 text-center">

                    <h3>
                        Access Denied
                    </h3>

                    <p className="text-muted">
                        You do not have permission to access doctor records.
                    </p>

                </div>
            </>
        )
    }

    return (
        <div className="container py-4">

            <NavBar />

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold mb-1">
                        Doctors
                    </h1>

                    <p className="text-muted mb-0">
                        Manage doctors and their availability.
                    </p>

                </div>

                <span className="badge bg-primary fs-6 px-3 py-2">
                    {doctors.length} Doctors
                </span>

            </div>


            {/* Doctor Form */}

            {canManage && (
                <div className="card shadow-sm border-0 mb-5">

                    <div className="card-header bg-white border-0 pt-4 px-4">

                        <h4 className="fw-bold mb-1">
                            {editingId
                                ? "Edit Doctor"
                                : "Add New Doctor"}
                        </h4>

                        <p className="text-muted mb-0">
                            {editingId
                                ? "Update the doctor's information below."
                                : "Enter the doctor's information to create a new record."
                            }
                        </p>

                    </div>

                    <div className="card-body p-4">

                        <h6 className="text-primary fw-bold mb-3">
                            Personal Information
                        </h6>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter doctor name"
                                    value={doctorForm.name}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            name: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-3">

                                <label className="form-label">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={doctorForm.dateOfBirth}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            dateOfBirth: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-3">

                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    value={doctorForm.gender}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            gender: e.target.value
                                        })
                                    }
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Cardiologist"
                                    value={doctorForm.specialization}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            specialization: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    License Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Medical license number"
                                    value={doctorForm.licenseNumber}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            licenseNumber: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>


                        <hr className="my-4" />


                        <h6 className="text-primary fw-bold mb-3">
                            Contact Information
                        </h6>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone number"
                                    value={doctorForm.phone}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            phone: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    value={doctorForm.email}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            email: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-12">

                                <label className="form-label">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Doctor address"
                                    value={doctorForm.address}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            address: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>


                        <hr className="my-4" />


                        <h6 className="text-primary fw-bold mb-3">
                            Department & Schedule
                        </h6>

                        <div className="row g-3">

                            <div className="col-md-4">

                                <label className="form-label">
                                    Department
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Department"
                                    value={doctorForm.department}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            department: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Arrival Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={doctorForm.arrivalTime}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            arrivalTime: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Departure Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={doctorForm.departureTime}
                                    onChange={(e) =>
                                        setDoctorForm({
                                            ...doctorForm,
                                            departureTime: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>


                        <div className="d-flex gap-2 mt-4">

                            {editingId ? (
                                <>

                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={handleUpdateDoctor}
                                    >
                                        Update Doctor
                                    </button>

                                    <button
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => {
                                            setEditingId(null)
                                            setDoctorForm(emptyForm)
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </>
                            ) : (

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={handleAddDoctor}
                                >
                                    Add Doctor
                                </button>

                            )}

                        </div>

                    </div>

                </div>
            )}


            {/* Doctor List */}

            <div className="card shadow-sm border-0">

                <div className="card-header bg-white border-0 p-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h4 className="fw-bold mb-1">
                                Doctor Records
                            </h4>

                            <p className="text-muted mb-0">
                                View registered doctors and their availability.
                            </p>

                        </div>

                        <span className="badge bg-light text-dark border">
                            {filteredDoctors.length} results
                        </span>

                    </div>


                    <div className="mt-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search doctor by name..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>


                <div className="list-group list-group-flush">

                    {filteredDoctors.length === 0 ? (

                        <div className="p-5 text-center">

                            <h5 className="text-muted">
                                No doctors found
                            </h5>

                            <p className="text-muted mb-0">
                                Try searching for a different name.
                            </p>

                        </div>

                    ) : (

                        filteredDoctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="list-group-item p-4"
                            >

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="text-decoration-none"
                                        >

                                            <h5 className="mb-1 fw-semibold text-dark">
                                                {doctor.name}
                                            </h5>

                                        </Link>

                                        <div className="text-muted small">

                                            {doctor.specialization}

                                            <span className="mx-2">
                                                •
                                            </span>

                                            {doctor.department || "No department assigned"}

                                        </div>

                                    </div>


                                    <div className="d-flex align-items-center gap-2">

                                        <span
                                            className={`badge ${doctor.availability
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {doctor.availability
                                                ? "Available"
                                                : "Not Available"}
                                        </span>


                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            View
                                        </Link>


                                        {canManage && (
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                    startEditing(doctor)
                                                }
                                            >
                                                Edit
                                            </button>
                                        )}


                                        {canToggleAvailability && (
                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() =>
                                                    handleToggleAvailability(
                                                        doctor.id
                                                    )
                                                }
                                            >
                                                Toggle
                                            </button>
                                        )}


                                        {canDelete && (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDeleteDoctor(
                                                        doctor.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    )
}

export default DoctorList