import { useState, useEffect } from 'react'
import BillForm from './BillForm'
import BillList from './BillList'

function Bill() {
  const [bill, setBill] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [labReports, setLabReports] = useState([])

  const [editingId, setEditingId] = useState(null)

  const [billForm, setBillForm] = useState({
    patientId: "",
    doctorId: "",
    consultationFee: "",
    medicineFee: "",
    labFee: "",
    otherFee: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('https://localhost:7172/api/patient').then(res => res.json()),
      fetch('https://localhost:7172/api/doctor').then(res => res.json()),
      fetch('https://localhost:7172/api/appointment').then(res => res.json()),
      fetch('https://localhost:7172/api/bloodtest').then(res => res.json()),
      fetch('https://localhost:7172/api/billing').then(res => res.json())
    ])
      .then(([patientsData, doctorsData, appointmentsData, labData, billsData]) => {
        setPatients(patientsData)
        setDoctors(doctorsData)
        setAppointments(appointmentsData)
        setLabReports(labData)
        setBill(billsData)
        setLoading(false)
      })
  }, [])

  const calculateConsultationFee = (patientId, doctorId) => {
    const completedAppointments = appointments.filter(
      appointment =>
        Number(appointment.patientId) === Number(patientId) &&
        Number(appointment.doctorId) === Number(doctorId) &&
        appointment.status === "Completed"
    )

    if (completedAppointments.length === 0) {
      return 0
    }

    // If this patient has previously completed an appointment
    // with this doctor, charge 300.
    if (completedAppointments.length > 1) {
      return 300
    }

    return 500
  }

  const calculateLabFee = (patientId) => {
    const reports = labReports.filter(
      report => Number(report.patientId) === Number(patientId)
    )

    let total = 0

    reports.forEach(report => {
      if (report.results === "Blood group test only") {
        total += 50
      } else {
        total += 5000
      }
    })

    return total
  }

  const handleAddBill = (newBill) => {
    const consultationFee = calculateConsultationFee(
      newBill.patientId,
      newBill.doctorId
    )

    const labFee = calculateLabFee(newBill.patientId)

    fetch('https://localhost:7172/api/billing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: Number(newBill.patientId),
        doctorId: Number(newBill.doctorId),
        consultationFee: consultationFee,
        medicineFee: Number(newBill.medicineFee) || 0,
        labFee: labFee,
        otherFee: Number(newBill.otherFee) || 0
      })
    })
      .then(async response => {
        if (!response.ok) {
          const message = await response.text()
          throw new Error(message)
        }

        return response.json()
      })
      .then(data => {
        setBill([...bill, data])

        setBillForm({
          patientId: "",
          doctorId: "",
          consultationFee: "",
          medicineFee: "",
          labFee: "",
          otherFee: ""
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  const handleDeleteBill = (id) => {
    fetch(`https://localhost:7172/api/billing/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBill(
          bill.filter(b => b.id !== id)
        )
      })
  }

  const startEditing = (currentBill) => {
    setEditingId(currentBill.id)

    setBillForm({
      patientId: currentBill.patientId,
      doctorId: currentBill.doctorId,
      consultationFee: currentBill.consultationFee,
      medicineFee: currentBill.medicineFee,
      labFee: currentBill.labFee,
      otherFee: currentBill.otherFee
    })
  }

  const handleUpdateBill = () => {
    fetch(`https://localhost:7172/api/billing/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        patientId: Number(billForm.patientId),
        doctorId: Number(billForm.doctorId),
        consultationFee: Number(billForm.consultationFee),
        medicineFee: Number(billForm.medicineFee),
        labFee: Number(billForm.labFee),
        otherFee: Number(billForm.otherFee)
      })
    })
      .then(response => response.json())
      .then(updatedBill => {
        setBill(
          bill.map(b =>
            b.id === editingId ? updatedBill : b
          )
        )

        setEditingId(null)

        setBillForm({
          patientId: "",
          doctorId: "",
          consultationFee: "",
          medicineFee: "",
          labFee: "",
          otherFee: ""
        })
      })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>

      <BillForm
        billForm={billForm}
        setBillForm={setBillForm}
        onAdd={handleAddBill}
        patients={patients}
        doctors={doctors}
      />

      <BillList
        bill={bill}
        onEdit={startEditing}
        onDelete={handleDeleteBill}
        patients={patients}
        doctors={doctors}
      />

    </div>
  )
}

export default Bill