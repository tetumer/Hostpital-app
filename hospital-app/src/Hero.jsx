import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
    return (
        <div className="hero-page">
            {/* Top bar */}
            <nav className="navbar navbar-expand-lg shadow-sm hero-nav">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold">
                        <i className="bi bi-hospital me-2"></i>
                        X Hospital 
                    </Link>

                    <div className="d-flex align-items-center ms-auto">
                        <Link to="/departments" className="btn btn-outline-dark btn-sm me-2">
                            Departments
                        </Link>
                        <Link to="/login" className="btn btn-dark btn-sm">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero banner */}
            <div className="hero-banner">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-lg-6">
                            <h1 className="hero-title">
                                Your health,
                                <br />
                                In good hands.
                            </h1>
                            <p className="hero-subtitle">
                                From your first visit to your last prescription, everything stays connected — for you, and for the people caring for you.
                            </p>
                            <div className="d-flex gap-3 mt-4">
                                <Link to="/departments" className="btn btn-dark btn-lg px-4">
                                    View Departments
                                </Link>
                                <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
                                    Staff Login
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop"
                                alt="Hospital corridor"
                                className="hero-img"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Alternating section 1: image left, text right */}
            <div className="container py-5">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6 order-lg-1">
                        <img
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                            alt="Doctor with patient"
                            className="section-img"
                        />
                    </div>
                    <div className="col-lg-6 order-lg-2">
                        <span className="eyebrow">For Patients</span>
                        <h2 className="section-title">
                            Care that fits your life
                        </h2>
                        <ul className="feature-list">
                            <li>Skilled doctors, always within reach</li>
                            <li>A calm, modern space to heal</li>
                            <li>Simple care, start to finish</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Alternating section 2: text left, image right */}
            <div className="container py-5">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6 order-lg-2">
                        <img
                            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop"
                            alt="Medical staff at work"
                            className="section-img"
                        />
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <span className="eyebrow">For Staff</span>
                        <h2 className="section-title">
                            Efficient care, without the chaos
                        </h2>
                        <ul className="feature-list">
                            <li>Advanced labs, accurate results</li>
                            <li>Here for you, day or night</li>
                            <li>Care that never takes a day off</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="hero-footer">
                <div className="container">
                    &copy; 2026 Hospital Management System
                </div>
            </footer>
        </div>
    )
}

export default Hero