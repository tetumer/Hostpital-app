import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BloodTest from './BloodTest'
import BloodGroupReport from './BloodGroupReport'
import NavBar from './NavBar'

function LabReports() {
    const [reportType, setReportType] = useState("")
    const [reports, setReports] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState("")

    const token = localStorage.getItem("token")

    const authHeaders = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {

        Promise.all([
            fetch('https://localhost:7172/api/patient', {
                headers: authHeaders
            }).then(res => res.json()),

            fetch('https://localhost:7172/api/doctor', {
                headers: authHeaders
            }).then(res => res.json()),

            fetch('https://localhost:7172/api/bloodtest', {
                headers: authHeaders
            }).then(res => res.json()),

            fetch('https://localhost:7172/api/dashboard', {
                headers: authHeaders
            }).then(res => res.json())
        ])
            .then(([patientsData, doctorsData, reportsData, dashboardData]) => {

                setPatients(patientsData)
                setDoctors(doctorsData)
                setReports(reportsData)

                setRole(dashboardData.welcome.role)

                setLoading(false)
            })
            .catch(error => {
                console.error("LAB REPORT ERROR:", error)
                setLoading(false)
            })

    }, [])


    const handleAddReport = (newReport) => {

        fetch('https://localhost:7172/api/bloodtest', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                patientId: Number(newReport.patientId),
                doctorId: Number(newReport.doctorId),
                bloodType: newReport.bloodType,
                results: newReport.results || "",
                date: newReport.date
            })
        })
            .then(async response => {

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                return response.json()
            })
            .then(data => {

                setReports(prev => [...prev, data])
                setReportType("")
            })
            .catch(error => {
                alert(error.message)
            })
    }


    const handleDeleteReport = (id) => {

        if (!window.confirm("Are you sure you want to delete this report?")) {
            return
        }

        fetch(`https://localhost:7172/api/bloodtest/${id}`, {
            method: 'DELETE',

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async response => {

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                setReports(prev =>
                    prev.filter(report => report.id !== id)
                )
            })
            .catch(error => {
                alert(error.message)
            })
    }


    if (loading) {
        return (
            <div className="container py-4">
                <p>Loading...</p>
            </div>
        )
    }


    const canManage =
        role === "Owner" ||
        role === "Receptionist"

    const canDelete =
        role === "Owner"


    return (
        <div className="container py-4">

            <NavBar />

            <div className="mb-4">

                <h1 className="fw-bold mb-1">
                    Laboratory Reports
                </h1>

                <p className="text-muted">
                    Create and view patient laboratory reports.
                </p>

            </div>


            {/* CREATE REPORT */}

            {canManage && (

                <>
                    <div className="card shadow-sm mb-4">

                        <div className="card-body">

                            <label className="form-label fw-semibold">
                                Create New Report
                            </label>

                            <select
                                className="form-select"
                                value={reportType}
                                onChange={(e) =>
                                    setReportType(e.target.value)
                                }
                            >

                                <option value="">
                                    Select Report Type
                                </option>

                                <option value="cbc">
                                    CBC Report
                                </option>

                                <option value="blood">
                                    Blood Group Report
                                </option>

                            </select>

                        </div>

                    </div>


                    {reportType === "cbc" && (
                        <BloodTest
                            onAdd={handleAddReport}
                            patients={patients}
                            doctors={doctors}
                        />
                    )}

                    {reportType === "blood" && (
                        <BloodGroupReport
                            onAdd={handleAddReport}
                            patients={patients}
                            doctors={doctors}
                        />
                    )}
                </>
            )}


            {/* SAVED REPORTS */}

            <div className="card shadow-sm mt-4">

                <div className="card-header">

                    <h4 className="mb-0">
                        Saved Reports
                    </h4>

                </div>


                <div className="list-group list-group-flush">

                    {reports.length === 0 ? (

                        <div className="p-4 text-center text-muted">
                            No laboratory reports found.
                        </div>

                    ) : (

                        reports.map((report) => {

                            const patient = patients.find(
                                p =>
                                    p.id === Number(report.patientId)
                            )

                            const doctor = doctors.find(
                                d =>
                                    d.id === Number(report.doctorId)
                            )

                            const isBloodGroup =
                                report.results === "Blood group test only"

                            const reportName = isBloodGroup
                                ? "Blood Group Report"
                                : "Complete Blood Count (CBC)"


                            return (

                                <div
                                    key={report.id}
                                    className="list-group-item p-3"
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <Link
                                            to={`/lab-reports/${report.id}`}
                                            className="text-decoration-none text-dark flex-grow-1"
                                        >

                                            <div>

                                                <h5 className="mb-1">
                                                    {reportName}
                                                </h5>

                                                <div className="text-muted small">
                                                    Patient: {patient?.name || "Unknown"}
                                                </div>

                                                <div className="text-muted small">
                                                    Doctor: {doctor?.name || "Unknown"}
                                                </div>

                                            </div>

                                        </Link>


                                        <div className="text-end ms-3">

                                            <div className="fw-semibold">
                                                {report.bloodType}
                                            </div>

                                            <small className="text-muted d-block mb-2">
                                                {report.date}
                                            </small>


                                            {canDelete && (

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        handleDeleteReport(report.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            )
                        })
                    )}

                </div>

            </div>

        </div>
    )
}

export default LabReports