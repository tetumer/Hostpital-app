import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function DoctorDetails() {
    const { id } = useParams()
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch(`https://localhost:7172/api/doctor/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load doctor details.")
                }

                return response.json()
            })
            .then((data) => {
                setDoctor(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Failed to load doctor:", error)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="text-muted mt-3">
                        Loading doctor details...
                    </p>
                </div>
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    Doctor not found.
                </div>

                <Link
                    to="/doctors"
                    className="btn btn-outline-primary"
                >
                    Back to Doctors
                </Link>
            </div>
        )
    }

    return (
        <div className="container py-4">

            {/* Back button */}
            <div className="mb-4">
                <Link
                    to="/doctors"
                    className="btn btn-outline-secondary"
                >
                    ← Back to Doctors
                </Link>
            </div>


            {/* Doctor Header */}
            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <div className="row align-items-center">

                        {/* Avatar */}
                        <div className="col-auto">

                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    fontSize: '32px',
                                    fontWeight: '600'
                                }}
                            >
                                {doctor.name?.charAt(0).toUpperCase()}
                            </div>

                        </div>


                        {/* Name */}
                        <div className="col">

                            <h1 className="fw-bold mb-1">
                                {doctor.name}
                            </h1>

                            <p className="text-primary fs-5 mb-2">
                                {doctor.specialization}
                            </p>

                            <span
                                className={
                                    doctor.availability
                                        ? "badge bg-success-subtle text-success"
                                        : "badge bg-danger-subtle text-danger"
                                }
                            >
                                {doctor.availability
                                    ? "Available"
                                    : "Not Available"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Main Information */}
            <div className="row g-4">

                {/* Personal Information */}
                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white py-3">
                            <h4 className="mb-0">
                                Personal Information
                            </h4>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Full Name
                                </small>

                                <span className="fw-semibold">
                                    {doctor.name}
                                </span>
                            </div>


                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Date of Birth
                                </small>

                                <span className="fw-semibold">
                                    {doctor.dateOfBirth || "Not provided"}
                                </span>
                            </div>


                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Gender
                                </small>

                                <span className="fw-semibold">
                                    {doctor.gender || "Not provided"}
                                </span>
                            </div>


                            <div>
                                <small className="text-muted d-block">
                                    Address
                                </small>

                                <span className="fw-semibold">
                                    {doctor.address || "Not provided"}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Professional Information */}
                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white py-3">
                            <h4 className="mb-0">
                                Professional Information
                            </h4>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Specialization
                                </small>

                                <span className="fw-semibold">
                                    {doctor.specialization}
                                </span>
                            </div>


                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Department
                                </small>

                                <span className="fw-semibold">
                                    {doctor.department || "Not assigned"}
                                </span>
                            </div>


                            <div>
                                <small className="text-muted d-block">
                                    License Number
                                </small>

                                <span className="fw-semibold">
                                    {doctor.licenseNumber || "Not provided"}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Contact Information */}
                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white py-3">
                            <h4 className="mb-0">
                                Contact Information
                            </h4>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <small className="text-muted d-block">
                                    Phone
                                </small>

                                <span className="fw-semibold">
                                    {doctor.phone || "Not provided"}
                                </span>
                            </div>


                            <div>
                                <small className="text-muted d-block">
                                    Email
                                </small>

                                <span className="fw-semibold">
                                    {doctor.email || "Not provided"}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Schedule */}
                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white py-3">
                            <h4 className="mb-0">
                                Schedule
                            </h4>
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-6">

                                    <small className="text-muted d-block">
                                        Arrival Time
                                    </small>

                                    <span className="fw-semibold fs-5">
                                        {doctor.arrivalTime || "--:--"}
                                    </span>

                                </div>


                                <div className="col-6">

                                    <small className="text-muted d-block">
                                        Departure Time
                                    </small>

                                    <span className="fw-semibold fs-5">
                                        {doctor.departureTime || "--:--"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom */}
            <div className="mt-4">

                <Link
                    to="/doctors"
                    className="btn btn-primary"
                >
                    Back to Doctor List
                </Link>

            </div>

        </div>
    )
}

export default DoctorDetails