import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
            return
        }

        fetch("https://localhost:7172/api/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                const text = await response.text()

                if (!response.ok) {
                    throw new Error(text)
                }

                return JSON.parse(text)
            })
            .then((data) => {
                setDashboardData(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("DASHBOARD ERROR:", error)
                setLoading(false)
            })
    }, [navigate])

    if (loading) {
        return (
            <div className="min-vh-100 bg-light">
                <NavBar />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="text-muted mt-3">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (!dashboardData) {
        return (
            <div className="min-vh-100 bg-light">
                <NavBar />
                <div className="container py-5">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center py-5">
                            <div className="fs-1 mb-3">⚠️</div>
                            <h4 className="fw-bold">Dashboard unavailable</h4>
                            <p className="text-muted mb-0">
                                Could not load your dashboard information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const welcome = dashboardData.welcome || {}
    const overview = dashboardData.overview || {}
    const appointments = dashboardData.appointments || {}
    const financialOverview = dashboardData.financialOverview || {}
    const charts = dashboardData.charts || {}
    const sections = dashboardData.sections || {}

    return (
        <div className="min-vh-100 bg-light">
            <NavBar />

            <div className="container py-4">

                {/* HEADER */}
                <div className="mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-primary fw-semibold mb-1">
                                        Hospital Management System
                                    </p>
                                    <h1 className="fw-bold mb-1">Dashboard</h1>
                                    <p className="text-muted mb-0">
                                        Welcome back, {welcome.username || "User"}.
                                    </p>
                                </div>
                                <div>
                                    {welcome.role && (
                                        <span className="badge bg-primary px-3 py-2 fs-6">
                                            {welcome.role}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* OVERVIEW (Owner) */}
                {(overview.totalPatients !== undefined ||
                    overview.totalDoctors !== undefined ||
                    appointments.total !== undefined) && (
                        <div className="row g-4 mb-4">
                            {overview.totalPatients !== undefined && (
                                <div className="col-md-6 col-xl-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="text-muted mb-1">Patients</p>
                                                    <h2 className="fw-bold mb-0">{overview.totalPatients}</h2>
                                                </div>
                                                <span className="fs-2">👥</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {overview.totalDoctors !== undefined && (
                                <div className="col-md-6 col-xl-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="text-muted mb-1">Doctors</p>
                                                    <h2 className="fw-bold mb-0">{overview.totalDoctors}</h2>
                                                </div>
                                                <span className="fs-2">🩺</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {appointments.total !== undefined && (
                                <div className="col-md-6 col-xl-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="text-muted mb-1">Appointments</p>
                                                    <h2 className="fw-bold mb-0">{appointments.total}</h2>
                                                </div>
                                                <span className="fs-2">📅</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                {/* FINANCIAL OVERVIEW (Owner) */}
                {Object.keys(financialOverview).length > 0 && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Financial Overview</h4>
                            <p className="text-muted mb-0">Hospital financial information.</p>
                        </div>
                        <div className="card-body p-4">
                            {financialOverview.revenue !== undefined && (
                                <div className="bg-light rounded p-4" style={{ maxWidth: "300px" }}>
                                    <small className="text-muted">Total Revenue</small>
                                    <h3 className="fw-bold text-success mb-0">
                                        ${financialOverview.revenue}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CHARTS (Owner) */}
                {Object.keys(charts).length > 0 && (
                    <div className="row g-4 mb-4">

                        {charts.appointmentsByStatus && (
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white border-0 p-3">
                                        <h6 className="fw-bold mb-0">Appointments by Status</h6>
                                    </div>
                                    <div className="card-body">
                                        {charts.appointmentsByStatus.map((item) => (
                                            <div key={item.status} className="mb-2">
                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span>{item.status}</span>
                                                    <span className="fw-bold">{item.count}</span>
                                                </div>
                                                <div className="progress" style={{ height: "6px" }}>
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width: `${(item.count / appointments.total) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {charts.doctorsByDepartment && (
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white border-0 p-3">
                                        <h6 className="fw-bold mb-0">Doctors by Department</h6>
                                    </div>
                                    <div className="card-body">
                                        {charts.doctorsByDepartment.map((item) => (
                                            <div key={item.department} className="d-flex justify-content-between small mb-2">
                                                <span>{item.department || "Unassigned"}</span>
                                                <span className="badge bg-primary-subtle text-primary">
                                                    {item.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {charts.patientsByStatus && (
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white border-0 p-3">
                                        <h6 className="fw-bold mb-0">Patients by Status</h6>
                                    </div>
                                    <div className="card-body">
                                        {charts.patientsByStatus.map((item) => (
                                            <div key={item.status} className="d-flex justify-content-between small mb-2">
                                                <span>{item.status}</span>
                                                <span className="badge bg-secondary-subtle text-secondary">
                                                    {item.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* RECEPTIONIST / DOCTOR / PATIENT SECTIONS */}

                {sections.doctors && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Doctor Overview</h4>
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-4">
                                {sections.doctors.total !== undefined && (
                                    <div className="col-md-4">
                                        <div className="bg-light rounded p-4">
                                            <small className="text-muted">Total Doctors</small>
                                            <h3 className="fw-bold mb-0">{sections.doctors.total}</h3>
                                        </div>
                                    </div>
                                )}
                                {sections.doctors.available !== undefined && (
                                    <div className="col-md-4">
                                        <div className="bg-light rounded p-4">
                                            <small className="text-muted">Available</small>
                                            <h3 className="fw-bold text-success mb-0">
                                                {sections.doctors.available}
                                            </h3>
                                        </div>
                                    </div>
                                )}
                                {sections.doctors.unavailable !== undefined && (
                                    <div className="col-md-4">
                                        <div className="bg-light rounded p-4">
                                            <small className="text-muted">Unavailable</small>
                                            <h3 className="fw-bold mb-0">{sections.doctors.unavailable}</h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {sections.patients && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Patient Overview</h4>
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-4">
                                {sections.patients.total !== undefined && (
                                    <div className="col-md-4">
                                        <div className="bg-light rounded p-4">
                                            <small className="text-muted">Total Patients</small>
                                            <h3 className="fw-bold mb-0">{sections.patients.total}</h3>
                                        </div>
                                    </div>
                                )}
                                {sections.patients.admitted !== undefined && (
                                    <div className="col-md-4">
                                        <div className="bg-light rounded p-4">
                                            <small className="text-muted">Admitted</small>
                                            <h3 className="fw-bold mb-0">{sections.patients.admitted}</h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {sections.appointments && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Appointments</h4>
                        </div>
                        <div className="card-body p-0">
                            {sections.appointments.length === 0 ? (
                                <div className="text-center p-5">
                                    <div className="fs-1 mb-3">📅</div>
                                    <p className="text-muted mb-0">No appointments found.</p>
                                </div>
                            ) : (
                                <div className="list-group list-group-flush">
                                    {sections.appointments.map((appointment) => (
                                        <div key={appointment.id} className="list-group-item p-4">
                                            <div className="row align-items-center">
                                                <div className="col-md-3">
                                                    <small className="text-muted d-block">Date</small>
                                                    <span>{appointment.date}</span>
                                                </div>
                                                <div className="col-md-2">
                                                    <small className="text-muted d-block">Time</small>
                                                    <span>{appointment.time}</span>
                                                </div>
                                                <div className="col-md-3 text-md-end ms-auto">
                                                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {sections.billing && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Billing</h4>
                        </div>
                        <div className="card-body p-4">
                            {Array.isArray(sections.billing) ? (
                                sections.billing.length === 0 ? (
                                    <p className="text-muted mb-0">No bills found.</p>
                                ) : (
                                    <div className="list-group">
                                        {sections.billing.map((bill) => (
                                            <div key={bill.id} className="list-group-item d-flex justify-content-between">
                                                <span>Bill #{bill.id}</span>
                                                <span className="fw-bold">
                                                    ${bill.consultationFee + bill.medicineFee + bill.labFee + bill.otherFee}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="row g-4">
                                    {sections.billing.total !== undefined && (
                                        <div className="col-md-4">
                                            <div className="bg-light rounded p-4">
                                                <small className="text-muted">Total Bills</small>
                                                <h3 className="fw-bold mb-0">{sections.billing.total}</h3>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {sections.laboratory && (
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 p-4">
                            <h4 className="fw-bold mb-1">Laboratory</h4>
                        </div>
                        <div className="card-body p-4">
                            {sections.laboratory.length === 0 ? (
                                <p className="text-muted mb-0">No lab reports found.</p>
                            ) : (
                                sections.laboratory.map((report) => (
                                    <div key={report.id} className="border-bottom py-2 d-flex justify-content-between">
                                        <span>{report.bloodType}</span>
                                        <small className="text-muted">{report.date}</small>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {Object.keys(sections).length === 0 &&
                    Object.keys(overview).length === 0 &&
                    Object.keys(appointments).length === 0 &&
                    Object.keys(financialOverview).length === 0 && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-5">
                                <div className="fs-1 mb-3">📊</div>
                                <h4 className="fw-bold">Dashboard data unavailable</h4>
                                <p className="text-muted mb-0">
                                    Your dashboard information will appear here when the server provides it.
                                </p>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    )
}

export default Dashboard