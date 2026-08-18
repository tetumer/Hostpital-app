import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './NavBar'

function Reception() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (!user || user.role !== "Receptionist") {
            navigate("/dashboard")
        }
    }, [navigate, user])

    const modules = [
        {
            title: "Doctors",
            description: "View and manage doctors",
            icon: "bi-person-badge",
            link: "/doctors",
        },
        {
            title: "Patients",
            description: "Manage patient records",
            icon: "bi-people",
            link: "/patients",
        },
        {
            title: "Appointments",
            description: "Schedule and manage appointments",
            icon: "bi-calendar-check",
            link: "/appointments",
        },
        {
            title: "Departments",
            description: "View hospital departments",
            icon: "bi-building",
            link: "/departments",
        },
        {
            title: "Prescriptions",
            description: "Manage patient prescriptions",
            icon: "bi-prescription2",
            link: "/prescriptions",
        },
        {
            title: "Laboratory",
            description: "Create and view lab reports",
            icon: "bi-clipboard2-pulse",
            link: "/labreports",
        },
        {
            title: "Billing",
            description: "Manage patient bills",
            icon: "bi-receipt",
            link: "/bill",
        },
    ]

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <div className="bg-light min-vh-100">
            <nav className="navbar navbar-dark bg-primary shadow-sm">
                <div className="container">

                    <Link
                        to="/dashboard"
                        className="navbar-brand fw-bold fs-4"
                    >
                        <i className="bi bi-hospital me-2"></i>
                        Hospital Management
                    </Link>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-md-block">
                            <i className="bi bi-person-circle me-1"></i>
                            {user?.username || "Receptionist"}
                        </span>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>
                            Logout
                        </button>

                    </div>

                </div>
            </nav>


            {/* Main Content */}
            <main className="container py-5">

                {/* Welcome */}
                <div className="mb-5">

                    <h1 className="fw-bold mb-2">
                        Reception Dashboard
                    </h1>

                    <p className="text-muted mb-0">
                        Manage patients, appointments, doctors, laboratory reports,
                        prescriptions and billing from one place.
                    </p>

                </div>


                {/* Dashboard Cards */}
                <div className="row g-4">

                    {modules.map((module) => (

                        <div
                            className="col-12 col-sm-6 col-lg-4"
                            key={module.title}
                        >

                            <Link
                                to={module.link}
                                className="text-decoration-none"
                            >

                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        transition: "transform 0.2s, box-shadow 0.2s"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)"
                                        e.currentTarget.style.boxShadow =
                                            "0 0.75rem 1.5rem rgba(0,0,0,.12)"
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)"
                                        e.currentTarget.style.boxShadow =
                                            "0 .125rem .25rem rgba(0,0,0,.075)"
                                    }}
                                >

                                    <div className="card-body p-4">

                                        <div
                                            className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center mb-4"
                                            style={{
                                                width: "60px",
                                                height: "60px"
                                            }}
                                        >
                                            <i
                                                className={`bi ${module.icon} fs-3`}
                                            ></i>
                                        </div>

                                        <h4 className="card-title text-dark fw-bold">
                                            {module.title}
                                        </h4>

                                        <p className="card-text text-muted mb-3">
                                            {module.description}
                                        </p>

                                        <span className="text-primary fw-semibold">
                                            Open
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        </div>

                    ))}

                </div>


                {/* Back to Dashboard */}
                <div className="mt-5">

                    <Link
                        to="/dashboard"
                        className="btn btn-outline-primary"
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Dashboard
                    </Link>

                </div>

            </main>

        </div>
    )
}

export default Reception