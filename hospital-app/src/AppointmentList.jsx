function AppointmentList({
    appointments,
    patients,
    doctors,
    onDelete,
    onUpdate
}) {
    if (appointments.length === 0) {
        return (
            <div className="container py-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">No appointments found</h5>
                        <p className="text-muted mb-0">
                            There are currently no appointments scheduled.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Appointments</h2>
                    <p className="text-muted mb-0">
                        Manage scheduled appointments
                    </p>
                </div>

                <span className="badge text-bg-primary fs-6">
                    {appointments.length} Appointments
                </span>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">
                                <tr>
                                    <th className="px-4">Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th className="text-end px-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {appointments.map((appt) => {
                                    const patient = patients.find(
                                        (p) => p.id === Number(appt.patientId)
                                    )

                                    const doctor = doctors.find(
                                        (d) => d.id === Number(appt.doctorId)
                                    )

                                    return (
                                        <tr key={appt.id}>

                                            <td className="px-4 fw-semibold">
                                                {patient?.name || "Unknown Patient"}
                                            </td>

                                            <td>
                                                {doctor?.name || "Unknown Doctor"}
                                            </td>

                                            <td>
                                                {appt.date}
                                            </td>

                                            <td>
                                                {appt.time}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${appt.status === "Scheduled"
                                                            ? "text-bg-primary"
                                                            : appt.status === "Completed"
                                                                ? "text-bg-success"
                                                                : "text-bg-danger"
                                                        }`}
                                                >
                                                    {appt.status}
                                                </span>
                                            </td>

                                            <td className="text-end px-4">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => onDelete(appt.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AppointmentList