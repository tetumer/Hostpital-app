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
                console.log("STATUS:", response.status)

                const text = await response.text()

                console.log("RAW RESPONSE:", text)

                if (!response.ok) {
                    throw new Error(text)
                }

                return JSON.parse(text)
            })
            .then((data) => {
                console.log("DASHBOARD DATA:", data)

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

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-muted mt-3">
                        Loading dashboard...
                    </p>

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

                            <div className="fs-1 mb-3">
                                ⚠️
                            </div>

                            <h4 className="fw-bold">
                                Dashboard unavailable
                            </h4>

                            <p className="text-muted mb-0">
                                Could not load your dashboard information.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        )
    }


    /*
     * Everything below comes from the backend.
     *
     * The backend decides what data this user receives.
     * React only displays the data that exists.
     */

    const welcome = dashboardData.welcome || {}
    const overview = dashboardData.overview || {}
    const appointments = dashboardData.appointments || {}
    const financialOverview = dashboardData.financialOverview || {}

    const sections = dashboardData.sections || {}


    return (
        <div className="min-vh-100 bg-light">

            <NavBar />

            <div className="container py-4">


                {/* ================= HEADER ================= */}

                <div className="mb-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-primary fw-semibold mb-1">
                                        Hospital Management System
                                    </p>

                                    <h1 className="fw-bold mb-1">
                                        Dashboard
                                    </h1>

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


                {/* ================= OVERVIEW ================= */}

                {(overview.totalPatients !== undefined ||
                    overview.totalDoctors !== undefined ||
                    appointments.total !== undefined) && (

                        <div className="row g-4 mb-4">


                            {/* PATIENTS */}

                            {overview.totalPatients !== undefined && (

                                <div className="col-md-6 col-xl-4">

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body p-4">

                                            <div className="d-flex justify-content-between align-items-start">

                                                <div>

                                                    <p className="text-muted mb-1">
                                                        Patients
                                                    </p>

                                                    <h2 className="fw-bold mb-0">
                                                        {overview.totalPatients}
                                                    </h2>

                                                </div>

                                                <span className="fs-2">
                                                    👥
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* DOCTORS */}

                            {overview.totalDoctors !== undefined && (

                                <div className="col-md-6 col-xl-4">

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body p-4">

                                            <div className="d-flex justify-content-between align-items-start">

                                                <div>

                                                    <p className="text-muted mb-1">
                                                        Doctors
                                                    </p>

                                                    <h2 className="fw-bold mb-0">
                                                        {overview.totalDoctors}
                                                    </h2>

                                                </div>

                                                <span className="fs-2">
                                                    🩺
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* APPOINTMENTS */}

                            {appointments.total !== undefined && (

                                <div className="col-md-6 col-xl-4">

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body p-4">

                                            <div className="d-flex justify-content-between align-items-start">

                                                <div>

                                                    <p className="text-muted mb-1">
                                                        Appointments
                                                    </p>

                                                    <h2 className="fw-bold mb-0">
                                                        {appointments.total}
                                                    </h2>

                                                </div>

                                                <span className="fs-2">
                                                    📅
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}


                {/* ================= FINANCIAL OVERVIEW ================= */}

                {Object.keys(financialOverview).length > 0 && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Financial Overview
                            </h4>

                            <p className="text-muted mb-0">
                                Hospital financial information.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            {financialOverview.message && (

                                <p className="text-muted mb-0">
                                    {financialOverview.message}
                                </p>

                            )}


                            {financialOverview.revenue !== undefined && (

                                <div className="row g-4">

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Revenue
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {financialOverview.revenue}
                                            </h3>

                                        </div>

                                    </div>


                                    {financialOverview.expenses !== undefined && (

                                        <div className="col-md-4">

                                            <div className="bg-light rounded p-4">

                                                <small className="text-muted">
                                                    Expenses
                                                </small>

                                                <h3 className="fw-bold mb-0">
                                                    {financialOverview.expenses}
                                                </h3>

                                            </div>

                                        </div>

                                    )}


                                    {financialOverview.profit !== undefined && (

                                        <div className="col-md-4">

                                            <div className="bg-light rounded p-4">

                                                <small className="text-muted">
                                                    Profit
                                                </small>

                                                <h3 className="fw-bold text-success mb-0">
                                                    {financialOverview.profit}
                                                </h3>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* ================= SUMMARY ================= */}

                {sections.summary && (

                    <div className="row g-4 mb-4">


                        {sections.summary.patients !== undefined && (

                            <div className="col-md-6 col-xl-3">

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <p className="text-muted mb-1">
                                            Patients
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {sections.summary.patients}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        )}


                        {sections.summary.doctors !== undefined && (

                            <div className="col-md-6 col-xl-3">

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <p className="text-muted mb-1">
                                            Doctors
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {sections.summary.doctors}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        )}


                        {sections.summary.appointments !== undefined && (

                            <div className="col-md-6 col-xl-3">

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <p className="text-muted mb-1">
                                            Appointments
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {sections.summary.appointments}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        )}


                        {sections.summary.prescriptions !== undefined && (

                            <div className="col-md-6 col-xl-3">

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <p className="text-muted mb-1">
                                            Prescriptions
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {sections.summary.prescriptions}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                )}


                {/* ================= PATIENTS ================= */}

                {sections.patients && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Patient Overview
                            </h4>

                            <p className="text-muted mb-0">
                                Patient information available to you.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-4">

                                {sections.patients.total !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Total Patients
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {sections.patients.total}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.patients.active !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Active Patients
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {sections.patients.active}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.patients.admitted !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Admitted
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {sections.patients.admitted}
                                            </h3>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= APPOINTMENTS ================= */}

                {sections.appointments && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Appointments
                            </h4>

                            <p className="text-muted mb-0">
                                Your available appointment information.
                            </p>

                        </div>


                        <div className="card-body p-0">

                            {sections.appointments.length === 0 ? (

                                <div className="text-center p-5">

                                    <div className="fs-1 mb-3">
                                        📅
                                    </div>

                                    <p className="text-muted mb-0">
                                        No appointments found.
                                    </p>

                                </div>

                            ) : (

                                <div className="list-group list-group-flush">

                                    {sections.appointments.map(
                                        (appointment) => (

                                            <div
                                                key={appointment.id}
                                                className="list-group-item p-4"
                                            >

                                                <div className="row align-items-center">

                                                    <div className="col-md-4">

                                                        <h6 className="fw-bold mb-1">
                                                            {appointment.patientName}
                                                        </h6>

                                                        {appointment.doctorName && (

                                                            <small className="text-muted">
                                                                Dr.{" "}
                                                                {appointment.doctorName}
                                                            </small>

                                                        )}

                                                    </div>


                                                    <div className="col-md-3">

                                                        <small className="text-muted d-block">
                                                            Date
                                                        </small>

                                                        <span>
                                                            {appointment.date}
                                                        </span>

                                                    </div>


                                                    <div className="col-md-2">

                                                        <small className="text-muted d-block">
                                                            Time
                                                        </small>

                                                        <span>
                                                            {appointment.time}
                                                        </span>

                                                    </div>


                                                    <div className="col-md-3 text-md-end">

                                                        <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                                            {appointment.status}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* ================= DOCTORS ================= */}

                {sections.doctors && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Doctor Overview
                            </h4>

                            <p className="text-muted mb-0">
                                Doctor information available to you.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-4">

                                {sections.doctors.total !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Total Doctors
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {sections.doctors.total}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.doctors.available !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Available
                                            </small>

                                            <h3 className="fw-bold text-success mb-0">
                                                {sections.doctors.available}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.doctors.unavailable !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Unavailable
                                            </small>

                                            <h3 className="fw-bold mb-0">
                                                {sections.doctors.unavailable}
                                            </h3>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= PRESCRIPTIONS ================= */}

                {sections.prescriptions && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Prescriptions
                            </h4>

                            <p className="text-muted mb-0">
                                Prescription information available to you.
                            </p>

                        </div>


                        <div className="card-body">

                            {sections.prescriptions.length === 0 ? (

                                <p className="text-muted text-center py-4 mb-0">
                                    No prescriptions found.
                                </p>

                            ) : (

                                <div className="list-group">

                                    {sections.prescriptions.map(
                                        (prescription) => (

                                            <div
                                                key={prescription.id}
                                                className="list-group-item"
                                            >

                                                <div className="d-flex justify-content-between align-items-center">

                                                    <div>

                                                        <h6 className="fw-bold mb-1">
                                                            {prescription.medicine}
                                                        </h6>

                                                        <small className="text-muted">
                                                            {prescription.dosage}
                                                        </small>

                                                    </div>

                                                    <span className="text-muted">
                                                        {prescription.duration}
                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* ================= LABORATORY ================= */}

                {sections.laboratory && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Laboratory
                            </h4>

                            <p className="text-muted mb-0">
                                Laboratory information available to you.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            {sections.laboratory.total !== undefined && (

                                <div className="mb-3">

                                    <span className="text-muted">
                                        Total Reports
                                    </span>

                                    <h3 className="fw-bold">
                                        {sections.laboratory.total}
                                    </h3>

                                </div>

                            )}


                            {sections.laboratory.recent && (

                                <div>

                                    <h6 className="fw-bold mb-3">
                                        Recent Reports
                                    </h6>

                                    {sections.laboratory.recent.map(
                                        (report) => (

                                            <div
                                                key={report.id}
                                                className="border-bottom py-2"
                                            >
                                                {report.name}
                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* ================= DEPARTMENTS ================= */}

                {sections.departments && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Departments
                            </h4>

                            <p className="text-muted mb-0">
                                Department information available to you.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-3">

                                {sections.departments.map(
                                    (department) => (

                                        <div
                                            key={department.id}
                                            className="col-md-4"
                                        >

                                            <div className="border rounded p-3">

                                                <h6 className="fw-bold mb-1">
                                                    {department.name}
                                                </h6>

                                                {department.doctorCount !== undefined && (

                                                    <small className="text-muted">
                                                        {department.doctorCount} doctors
                                                    </small>

                                                )}

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= BILLING ================= */}

                {sections.billing && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Billing
                            </h4>

                            <p className="text-muted mb-0">
                                Billing information available to you.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-4">

                                {sections.billing.total !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Total Bills
                                            </small>

                                            <h3 className="fw-bold">
                                                {sections.billing.total}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.billing.pending !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Pending
                                            </small>

                                            <h3 className="fw-bold">
                                                {sections.billing.pending}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.billing.paid !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Paid
                                            </small>

                                            <h3 className="fw-bold text-success">
                                                {sections.billing.paid}
                                            </h3>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= FINANCIAL ================= */}

                {sections.financial && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">
                                Financial Overview
                            </h4>

                            <p className="text-muted mb-0">
                                Hospital financial information.
                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-4">

                                {sections.financial.revenue !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Revenue
                                            </small>

                                            <h3 className="fw-bold">
                                                {sections.financial.revenue}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.financial.expenses !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Expenses
                                            </small>

                                            <h3 className="fw-bold">
                                                {sections.financial.expenses}
                                            </h3>

                                        </div>

                                    </div>

                                )}


                                {sections.financial.profit !== undefined && (

                                    <div className="col-md-4">

                                        <div className="bg-light rounded p-4">

                                            <small className="text-muted">
                                                Profit
                                            </small>

                                            <h3 className="fw-bold text-success">
                                                {sections.financial.profit}
                                            </h3>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= NOTHING AVAILABLE ================= */}

                {Object.keys(sections).length === 0 &&
                    Object.keys(overview).length === 0 &&
                    Object.keys(appointments).length === 0 &&
                    Object.keys(financialOverview).length === 0 && (

                        <div className="card border-0 shadow-sm">

                            <div className="card-body text-center py-5">

                                <div className="fs-1 mb-3">
                                    📊
                                </div>

                                <h4 className="fw-bold">
                                    Dashboard data unavailable
                                </h4>

                                <p className="text-muted mb-0">
                                    Your dashboard information will appear here
                                    when the server provides it.
                                </p>

                            </div>

                        </div>

                    )}

            </div>

        </div>
    )
}

export default Dashboard