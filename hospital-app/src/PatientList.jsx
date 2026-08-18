import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function PatientList() {
    const [patients, setPatients] = useState([])
    const [accessDenied, setAccessDenied] = useState(false)
    const [patientForm, setPatientForm] = useState({
        name: "", dateOfBirth: "", bloodGroup: "", status: "",
        admissionDate: "", allergies: "", medicalHistory: "",
        phone: "", address: "", emergencyContact: "",
        gender: "", provider: "", policyNumber: "", coverage: "",
        doctorId: ""
    })
    const [doctors, setDoctors] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const emptyForm = {
        name: "", dateOfBirth: "", bloodGroup: "", status: "",
        admissionDate: "", allergies: "", medicalHistory: "",
        phone: "", address: "", emergencyContact: "",
        gender: "", provider: "", policyNumber: "", coverage: "",
        doctorId: ""
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch('https://localhost:7172/api/patient', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setAccessDenied(true)
                        setLoading(false)
                        return null
                    }

                    const message = await response.text()
                    throw new Error(message)
                }

                return response.json()
            })
            .then(async (data) => {

                if (!data) return

                setPatients(data)

                // Patient access was successful.
                // Now fetch doctors for the form.
                const doctorResponse = await fetch(
                    'https://localhost:7172/api/doctor',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (doctorResponse.ok) {
                    const doctorsData = await doctorResponse.json()
                    setDoctors(doctorsData)
                }

                setLoading(false)
            })
            .catch((error) => {
                console.error("Failed to load patients:", error)
                setLoading(false)
            })

    }, [])

    const filteredPatients = patients.filter((patient) =>
        patient.name?.toLowerCase().includes(search.toLowerCase())
    )

    const handleAddPatient = () => {
        fetch('https://localhost:7172/api/patient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientForm)
        })
            .then(async (response) => {
                const data = await response.json()

                if (!response.ok) {
                    console.log("Patient creation failed:", data)
                    return
                }

                setPatients([...patients, data.patient])
                setPatientForm(emptyForm)
            })
    }

    const handleDeletePatient = (id) => {
        if (!window.confirm("Are you sure you want to delete this patient?")) {
            return
        }

        fetch(`https://localhost:7172/api/patient/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setPatients(
                    patients.filter((patient) => patient.id !== id)
                )
            })
    }

    const startEditing = (patient) => {
        setEditingId(patient.id)
        setPatientForm(patient)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleUpdatePatient = () => {
        fetch(`https://localhost:7172/api/patient/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: editingId,
                ...patientForm
            })
        })
            .then((response) => response.json())
            .then((updatedPatient) => {
                setPatients(
                    patients.map((patient) =>
                        patient.id === editingId
                            ? updatedPatient
                            : patient
                    )
                )

                setEditingId(null)
                setPatientForm(emptyForm)
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
                    <h3>Access Denied</h3>

                    <p className="text-muted">
                        You do not have permission to access patient records.
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
                        Patients
                    </h1>

                    <p className="text-muted mb-0">
                        Manage patient records and information
                    </p>
                </div>

                <span className="badge bg-primary fs-6 px-3 py-2">
                    {patients.length} Patients
                </span>

            </div>


            {/* Patient Form */}

            <div className="card shadow-sm border-0 mb-5">

                <div className="card-header bg-white border-0 pt-4 px-4">

                    <h4 className="fw-bold mb-1">
                        {editingId ? "Edit Patient" : "Add New Patient"}
                    </h4>

                    <p className="text-muted mb-0">
                        {editingId
                            ? "Update the patient's information below."
                            : "Enter the patient's information to create a new record."
                        }
                    </p>

                </div>

                <div className="card-body p-4">

                    {/* Personal Information */}

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
                                placeholder="Enter patient name"
                                value={patientForm.name}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
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
                                value={patientForm.dateOfBirth}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
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
                                value={patientForm.gender}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        gender: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Assigned Doctor
                            </label>

                            <select
                                className="form-select"
                                value={patientForm.doctorId}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        doctorId: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Doctor</option>

                                {doctors.map((doctor) => (
                                    <option
                                        key={doctor.id}
                                        value={doctor.id}
                                    >
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label">
                                Blood Group
                            </label>

                            <select
                                className="form-select"
                                value={patientForm.bloodGroup}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        bloodGroup: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={patientForm.status}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="Admitted">Admitted</option>
                                <option value="Discharged">Discharged</option>
                                <option value="Outpatient">Outpatient</option>
                            </select>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label">
                                Admission Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={patientForm.admissionDate}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        admissionDate: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>


                    <hr className="my-4" />


                    {/* Contact Information */}

                    <h6 className="text-primary fw-bold mb-3">
                        Contact Information
                    </h6>

                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">
                                Phone
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                                value={patientForm.phone}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">
                                Emergency Contact
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Emergency contact"
                                value={patientForm.emergencyContact}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        emergencyContact: e.target.value
                                    })
                                }
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">
                                Address
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Patient address"
                                value={patientForm.address}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        address: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>


                    <hr className="my-4" />


                    {/* Medical Information */}

                    <h6 className="text-primary fw-bold mb-3">
                        Medical Information
                    </h6>

                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">
                                Allergies
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Known allergies"
                                value={patientForm.allergies}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        allergies: e.target.value
                                    })
                                }
                            />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label">
                                Medical History
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Medical history"
                                value={patientForm.medicalHistory}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        medicalHistory: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>


                    <hr className="my-4" />


                    {/* Insurance */}

                    <h6 className="text-primary fw-bold mb-3">
                        Insurance Information
                    </h6>

                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">
                                Insurance Provider
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Provider"
                                value={patientForm.provider}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        provider: e.target.value
                                    })
                                }
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">
                                Policy Number
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Policy number"
                                value={patientForm.policyNumber}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        policyNumber: e.target.value
                                    })
                                }
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">
                                Coverage
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Coverage details"
                                value={patientForm.coverage}
                                onChange={(e) =>
                                    setPatientForm({
                                        ...patientForm,
                                        coverage: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="d-flex gap-2 mt-4">

                        {editingId ? (
                            <>
                                <button
                                    className="btn btn-primary px-4"
                                    onClick={handleUpdatePatient}
                                >
                                    Update Patient
                                </button>

                                <button
                                    className="btn btn-outline-secondary px-4"
                                    onClick={() => {
                                        setEditingId(null)
                                        setPatientForm(emptyForm)
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-primary px-4"
                                onClick={handleAddPatient}
                            >
                                Add Patient
                            </button>
                        )}

                    </div>

                </div>
            </div>


            {/* Patient List */}

            <div className="card shadow-sm border-0">

                <div className="card-header bg-white border-0 p-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>
                            <h4 className="fw-bold mb-1">
                                Patient Records
                            </h4>

                            <p className="text-muted mb-0">
                                View and manage registered patients.
                            </p>
                        </div>

                        <span className="badge bg-light text-dark border">
                            {filteredPatients.length} results
                        </span>

                    </div>


                    <div className="mt-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search patient by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>


                <div className="list-group list-group-flush">

                    {filteredPatients.length === 0 ? (

                        <div className="p-5 text-center">

                            <h5 className="text-muted">
                                No patients found
                            </h5>

                            <p className="text-muted mb-0">
                                Try searching for a different name.
                            </p>

                        </div>

                    ) : (

                        filteredPatients.map((patient) => (

                            <div
                                key={patient.id}
                                className="list-group-item p-4"
                            >

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <Link
                                            to={`/patients/${patient.id}`}
                                            className="text-decoration-none"
                                        >
                                            <h5 className="mb-1 fw-semibold text-dark">
                                                {patient.name}
                                            </h5>
                                        </Link>

                                        <div className="text-muted small">

                                            DOB: {patient.dateOfBirth}

                                            <span className="mx-2">•</span>

                                            Blood Group: {patient.bloodGroup || "N/A"}

                                        </div>

                                    </div>


                                    <div className="d-flex align-items-center gap-2">

                                        <span
                                            className={`badge ${patient.status === "Admitted"
                                                    ? "bg-danger"
                                                    : patient.status === "Discharged"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                }`}
                                        >
                                            {patient.status || "Unknown"}
                                        </span>

                                        <Link
                                            to={`/patients/${patient.id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            View
                                        </Link>

                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => startEditing(patient)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeletePatient(patient.id)}
                                        >
                                            Delete
                                        </button>

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

export default PatientList