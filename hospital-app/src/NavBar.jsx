import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function NavBar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            setUser(null)
            return
        }

        fetch("https://localhost:7172/api/dashboard", {
            headers: {
                Authorization: `Bearer ${ token } `
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Could not get dashboard data.")
                }

                return await response.json()
            })
            .then((data) => {
                console.log("NAVBAR DASHBOARD DATA:", data)

                setUser({
                    username: data.welcome?.username,
                    role: data.welcome?.role
                })
            })
            .catch((error) => {
                console.error("NAVBAR USER ERROR:", error)
                setUser(null)
            })
    }, [])

    const navItems = {
        Owner: [
            { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
            { name: "Patients", path: "/patients", icon: "bi-people" },
            { name: "Doctors", path: "/doctors", icon: "bi-person-badge" },
            { name: "Appointments", path: "/appointments", icon: "bi-calendar-check" },
            { name: "Departments", path: "/departments", icon: "bi-building" },
            { name: "Prescriptions", path: "/prescriptions", icon: "bi-prescription2" },
            { name: "Laboratory", path: "/labreports", icon: "bi-clipboard2-pulse" },
            { name: "Billing", path: "/bill", icon: "bi-receipt" }
        ],

        Receptionist: [
            { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
            { name: "Patients", path: "/patients", icon: "bi-people" },
            { name: "Doctors", path: "/doctors", icon: "bi-person-badge" },
            { name: "Appointments", path: "/appointments", icon: "bi-calendar-check" },
            { name: "Departments", path: "/departments", icon: "bi-building" },
            { name: "Prescriptions", path: "/prescriptions", icon: "bi-prescription2" },
            { name: "Laboratory", path: "/labreports", icon: "bi-clipboard2-pulse" },
            { name: "Billing", path: "/bill", icon: "bi-receipt" }
        ],

        Doctor: [
            { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
            { name: "Patients", path: "/patients", icon: "bi-people" },
            { name: "Appointments", path: "/appointments", icon: "bi-calendar-check" },
            { name: "Prescriptions", path: "/prescriptions", icon: "bi-prescription2" },
            { name: "Laboratory", path: "/labreports", icon: "bi-clipboard2-pulse" }
        ],

        Patient: [
            { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
            { name: "Doctors", path: "/doctors", icon: "bi-person-badge" },
            { name: "Appointments", path: "/appointments", icon: "bi-calendar-check" },
            { name: "Prescriptions", path: "/prescriptions", icon: "bi-prescription2" },
            { name: "Laboratory", path: "/labreports", icon: "bi-clipboard2-pulse" },
            { name: "Billing", path: "/bill", icon: "bi-receipt" }
        ]
    }

    const role = user?.role
    const items = navItems[role] || []

    const handleLogout = () => {
        const token = localStorage.getItem("token")

        fetch("https://localhost:7172/api/user/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ token } `
            }
        })
            .finally(() => {
                localStorage.removeItem("token")
                navigate("/login")
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

            <div className="container">

                <Link
                    to="/dashboard"
                    className="navbar-brand fw-bold"
                >
                    <i className="bi bi-hospital me-2"></i>
                    Hospital Management
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >

                    <ul className="navbar-nav ms-auto">

                        {items.map((item) => (
                            <li
                                className="nav-item"
                                key={item.path}
                            >
                                <Link
                                    to={item.path}
                                    className="nav-link"
                                >
                                    <i className={`${ item.icon } me - 1`}></i>
                                    {item.name}
                                </Link>
                            </li>
                        ))}

                    </ul>

                </div>


                <div className="d-flex align-items-center ms-lg-3">

                    {user ? (
                        <>
                            <Link
                                to="/settings"
                                className="btn btn-outline-light btn-sm me-2"
                            >
                                <i className="bi bi-gear me-1"></i>
                                Settings
                            </Link>

                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-light btn-sm"
                        >
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            Login
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    )
}

export default NavBar


