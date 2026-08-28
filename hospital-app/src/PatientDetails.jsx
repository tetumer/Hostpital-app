import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from './navbar'

function PatientDetails() {
    const { id } = useParams()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)

useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(`https://localhost:7172/api/patient/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async (response) => {
            if (!response.ok) {
                const message = await response.text()
                throw new Error(message)
            }

            return response.json()
        })
        .then((data) => {
            setPatient(data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Could not load patient:", error)
            setPatient(null)
            setLoading(false)
        })
}, [id])

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="text-muted mt-3">
                    Loading patient information...
                </p>
            </div>
        )
    }

    if (!patient) {
        return (
            <div className="container py-5 text-center">
                <h3>Patient not found</h3>

                <Link
                    to="/patients"
                    className="btn btn-primary mt-3"
                >
                    Back to Patients
                </Link>
            </div>
        )
    }

    return (
       <div className="container py-4">

            <NavBar />

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <Link
                        to="/patients"
                        className="text-decoration-none text-muted small"
                    >
                        ← Back to Patients
                    </Link>

                    <h1 className="fw-bold mt-2 mb-1">
                        {patient.name}
                    </h1>

                    <p className="text-muted mb-0">
                        Patient ID: #{patient.id}
                    </p>
                </div>

                <span
                    className={`badge fs-6 px-3 py-2 ${patient.status === "Admitted"
                            ? "bg-danger"
                            : patient.status === "Discharged"
                                ? "bg-success"
                                : "bg-secondary"
                        }`}
                >
                    {patient.status || "Unknown"}
                </span>

            </div>


            {/* Quick Information */}

            <div className="row g-3 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <small className="text-muted">
                                Date of Birth
                            </small>

                            <h5 className="fw-semibold mt-1 mb-0">
                                {patient.dateOfBirth || "Not provided"}
                            </h5>

                        </div>
                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <small className="text-muted">
                                Blood Group
                            </small>

                            <h5 className="fw-semibold mt-1 mb-0">
                                {patient.bloodGroup || "Not provided"}
                            </h5>

                        </div>
                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <small className="text-muted">
                                Admission Date
                            </small>

                            <h5 className="fw-semibold mt-1 mb-0">
                                {patient.admissionDate || "Not provided"}
                            </h5>

                        </div>
                    </div>

                </div>

            </div>


            {/* Personal Information */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-header bg-white border-0 p-4">
                    <h4 className="fw-bold mb-0">
                        Personal Information
                    </h4>
                </div>

                <div className="card-body px-4 pb-4">

                    <div className="row g-4">

                        <div className="col-md-6">
                            <small className="text-muted d-block">
                                Full Name
                            </small>

                            <span className="fw-semibold">
                                {patient.name || "Not provided"}
                            </span>
                        </div>


                        <div className="col-md-6">
                            <small className="text-muted d-block">
                                Gender
                            </small>

                            <span className="fw-semibold">
                                {patient.gender || "Not provided"}
                            </span>
                        </div>


                        <div className="col-md-6">
                            <small className="text-muted d-block">
                                Date of Birth
                            </small>

                            <span className="fw-semibold">
                                {patient.dateOfBirth || "Not provided"}
                            </span>
                        </div>


                        <div className="col-md-6">
                            <small className="text-muted d-block">
                                Blood Group
                            </small>

                            <span className="fw-semibold">
                                {patient.bloodGroup || "Not provided"}
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            {/* Medical Information */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-header bg-white border-0 p-4">
                    <h4 className="fw-bold mb-0">
                        Medical Information
                    </h4>
                </div>

                <div className="card-body px-4 pb-4">

                    <div className="mb-4">

                        <small className="text-muted d-block mb-1">
                            Allergies
                        </small>

                        <div className="p-3 bg-light rounded">
                            {patient.allergies || "No known allergies recorded."}
                        </div>

                    </div>


                    <div>

                        <small className="text-muted d-block mb-1">
                            Medical History
                        </small>

                        <div className="p-3 bg-light rounded">
                            {patient.medicalHistory || "No medical history recorded."}
                        </div>

                    </div>

                </div>

            </div>


            {/* Contact Information */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-header bg-white border-0 p-4">
                    <h4 className="fw-bold mb-0">
                        Contact Information
                    </h4>
                </div>

                <div className="card-body px-4 pb-4">

                    <div className="row g-4">

                        <div className="col-md-6">

                            <small className="text-muted d-block">
                                Phone
                            </small>

                            <span className="fw-semibold">
                                {patient.phone || "Not provided"}
                            </span>

                        </div>


                        <div className="col-md-6">

                            <small className="text-muted d-block">
                                Emergency Contact
                            </small>

                            <span className="fw-semibold">
                                {patient.emergencyContact || "Not provided"}
                            </span>

                        </div>


                        <div className="col-12">

                            <small className="text-muted d-block">
                                Address
                            </small>

                            <span className="fw-semibold">
                                {patient.address || "Not provided"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Insurance */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-header bg-white border-0 p-4">
                    <h4 className="fw-bold mb-0">
                        Insurance Information
                    </h4>
                </div>

                <div className="card-body px-4 pb-4">

                    <div className="row g-4">

                        <div className="col-md-4">

                            <small className="text-muted d-block">
                                Insurance Provider
                            </small>

                            <span className="fw-semibold">
                                {patient.provider || "Not provided"}
                            </span>

                        </div>


                        <div className="col-md-4">

                            <small className="text-muted d-block">
                                Policy Number
                            </small>

                            <span className="fw-semibold">
                                {patient.policyNumber || "Not provided"}
                            </span>

                        </div>


                        <div className="col-md-4">

                            <small className="text-muted d-block">
                                Coverage
                            </small>

                            <span className="fw-semibold">
                                {patient.coverage || "Not provided"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom Navigation */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <Link
                    to="/patients"
                    className="btn btn-outline-secondary"
                >
                    ← Back to Patients
                </Link>

                <Link
                    to="/patients"
                    className="btn btn-primary"
                >
                    Patient List
                </Link>

            </div>

        </div>
    )
}

export default PatientDetails