import { useState, useEffect } from 'react'
import BillForm from './BillForm'
import BillList from './BillList'

function Bill() {
  const [bill, setBill] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setPatients(data.slice(0, 5))
        setDoctors(data.slice(5, 10))
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