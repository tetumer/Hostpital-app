import { useState, useEffect } from 'react'
import BillForm from './BillForm'
import BillList from './BillList'

function Bill() {
  const [bill, setBill] = useState([])
  const [patients, setPatients] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [billForm, setBillForm] = useState({
    patientId: "",
    doctorId: "",
    consultationFee: "",
    medicineFee: "",
    labFee: "",
    otherFee: ""
  })
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

    const handleAddBill = (newBill) => {
      fetch('https://localhost:7172/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: Number(newBill.patientId),
          doctorId: Number(newBill.doctorId),
          consultationFee: Number(newBill.consultationFee),
          medicineFee: Number(newBill.medicineFee),
          labFee: Number(newBill.labFee),
          otherFee: Number(newBill.otherFee)
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setBill([...bill, data])
        })
    }
    const handleDeleteBill = (id) => {
      fetch(`https://localhost:7172/api/billing/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setBill(bill.filter((bill) => bill.id !== id))
        })
    }


    const startEditing = (bill) => {
    setEditingId(bill.id)
    setBillForm({
      patientId: bill.patientId,
      doctorId: bill.doctorId,
      consultationFee: bill.consultationFee,
      medicineFee: bill.medicineFee,
      labFee: bill.labFee,
      otherFee: bill.otherFee
    })
  }

    const handleUpdateBill = () => {
      fetch(`https://localhost:7172/api/billing/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, patientId: Number(billForm.patientId), doctorId: Number(billForm.doctorId), consultationFee: Number(billForm.consultationFee), medicineFee: Number(billForm.medicineFee), labFee: Number(billForm.labFee), otherFee: Number(billForm.otherFee) })
      })
        .then((response) => response.json())
        .then((updatedBill) => {
          setBill(
            bill.map((b) =>
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
      <BillForm billForm={billForm} setBillForm={setBillForm} onAdd={handleAddBill} editingId={editingId} patients={patients} doctors={doctors}
/>
      <BillList bill={bill} onEdit={startEditing} onUpdate={handleUpdateBill} onDelete={handleDeleteBill} patients={patients} doctors={doctors} />
    </div>
  )
}

export default Bill