import { useState, useEffect } from 'react'
import BillForm from './BillForm'
import BillList from './BillList'

function Bill() {
  const [bill, setBill] = useState([])
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

  const handleAddBill = (newBill) => {
    setBill([...bill, { ...newBill, id: Date.now() }])
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <BillForm onAdd={handleAddBill} patients={patients} doctors={doctors} />
      <BillList bill={bill} patients={patients} doctors={doctors} />
    </div>
  )
}

export default Bill