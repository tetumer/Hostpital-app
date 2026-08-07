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
    setReports([...reports, newReport])
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
      <BloodGroupReport  onAdd={handleAddReport} patients={patients} doctors={doctors} />
    )}
  </div>
)
}

export default LabReports
