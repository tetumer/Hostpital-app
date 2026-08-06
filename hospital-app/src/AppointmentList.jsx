function AppointmentList({ appointments, patients, doctors }) {
  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appt) => {
          const patient = patients.find((p) => p.id === Number(appt.patientId))
          const doctor = doctors.find((d) => d.id === Number(appt.doctorId))
          return (
            <li key={appt.id}>
              {patient?.name} with {doctor?.name} — {appt.date} at {appt.time} — {appt.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AppointmentList