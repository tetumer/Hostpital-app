import { useState } from 'react'

function BloodGroupReport({ onAdd, patients, doctors }) {
  const [report, setReport] = useState({
    patientId: "",
    doctorId: "",
    bloodType: "",
    date: ""
  })

  const handleSubmit = () => {
    onAdd({
      patientId: report.patientId,
      doctorId: report.doctorId,
      bloodType: report.bloodType,
      results: "Blood group test only",
      date: report.date
    })
  }

  return (
    <div>
      <h1>Blood Group Test report</h1>

      <select
        value={report.patientId}
        onChange={(e) => setReport({ ...report, patientId: e.target.value })}
      >
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>

      <select
        value={report.doctorId}
        onChange={(e) => setReport({ ...report, doctorId: e.target.value })}
      >
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={report.date}
        onChange={(e) => setReport({ ...report, date: e.target.value })}
      />

      <select
        value={report.bloodType}
        onChange={(e) => setReport({ ...report, bloodType: e.target.value })}
      >
        <option value="">Select Blood Type</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>

      <button onClick={handleSubmit}>save</button>
    </div>
  )
}

export default BloodGroupReport