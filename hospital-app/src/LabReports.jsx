import { useState, useEffect } from 'react'
import BloodTest from './BloodTest'
import BloodGroupReport from './BloodGroupReport'

function LabReports() {
  const [reportType, setReportType] = useState("")
  const [reports, setReports] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://localhost:7172/api/patient')
      .then((response) => response.json())
      .then((data) => {
        setPatients(data)
      })
  }, [])

  useEffect(() => {
    fetch('https://localhost:7172/api/doctor')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
  }, [])

  const handleAddReport = (newReport) => {
    fetch('https://localhost:7172/api/bloodtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: Number(newReport.patientId),
        doctorId: Number(newReport.doctorId),
        bloodType: newReport.bloodType,
        results: newReport.results || "",
        date: newReport.date
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setReports([...reports, data])
      })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      >
        <option value="">Select Report</option>
        <option value="cbc">CBC Report</option>
        <option value="blood">Blood Group Report</option>
      </select>

      {reportType === "cbc" && (
        <BloodTest onAdd={handleAddReport} patients={patients} doctors={doctors} />
      )}

      {reportType === "blood" && (
        <BloodGroupReport onAdd={handleAddReport} patients={patients} doctors={doctors} />
      )}

      <div>
        <h2>Saved Reports</h2>
        <ul>
          {reports.map((r) => {
            const patient = patients.find((p) => p.id === Number(r.patientId))
            const doctor = doctors.find((d) => d.id === Number(r.doctorId))
            return (
              <li key={r.id}>
                {patient?.name} with {doctor?.name} — {r.bloodType} — {r.date}
                {r.results && <p>{r.results}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LabReports