import { useState } from 'react'



function AppointmentForm({ onAdd, patients, doctors }) {
    const [appointment, setAppointment] = useState({
        patientId: "",
        doctorId: "",
        date: "",
        time: "",
        status: "Scheduled"
    })

    return (
        <div className="container py-4">



            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <h2 className="mb-1">Make an Appointment</h2>
                            <p className="text-muted mb-4">
                                Schedule an appointment between a patient and doctor.
                            </p>

                            <div className="row g-3">

                                {/* Doctor */}
                                <div className="col-md-6">
                                    <label className="form-label">Doctor</label>

                                    <select
                                        className="form-select"
                                        value={appointment.doctorId}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                doctorId: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">Select Doctor</option>

                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Patient */}
                                <div className="col-md-6">
                                    <label className="form-label">Patient</label>

                                    <select
                                        className="form-select"
                                        value={appointment.patientId}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                patientId: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">Select Patient</option>

                                        {patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="col-md-6">
                                    <label className="form-label">Date</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={appointment.date}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                date: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                {/* Time */}
                                <div className="col-md-6">
                                    <label className="form-label">Time</label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        value={appointment.time}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                time: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-md-6">
                                    <label className="form-label">Status</label>

                                    <select
                                        className="form-select"
                                        value={appointment.status}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                status: e.target.value
                                            })
                                        }
                                    >
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                            </div>

                            <div className="d-flex justify-content-end mt-4">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={() => onAdd(appointment)}
                                >
                                    Book Appointment
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AppointmentForm