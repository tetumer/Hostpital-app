import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BillForm({ onAdd, patients, doctors }) {
    const [bill, setBill] = useState({
    patientId: "",
    doctorId: "",
    consultationFee: "",
    medicineFee: "",
    labFee: "",
    otherFee: "",

})

  return (
    <div>
      <h1>Bill</h1>

    <select
        value={bill.patientId}
        onChange={(e) =>
            setBill({
                ...bill,
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
    
    <select
        value={bill.doctorId}
        onChange={(e) =>
            setBill({
                ...bill,
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
    <div>
    <input
        type="number"
        placeholder="Consultation Fee"
        value={bill.consultationFee}
        onChange={(e) =>
            setBill({
                ...bill,
                consultationFee: e.target.value
            })
        }
    />

        <input
        type="number"
        placeholder="Medicine Fee"
        value={bill.medicineFee}
        onChange={(e) =>
            setBill({
                ...bill,
                medicineFee: e.target.value
            })
        }
    />
    <input
        type="number"
        placeholder="Lab Fee"
        value={bill.labFee}
        onChange={(e) =>
            setBill({
                ...bill,
                labFee: e.target.value
            })
        }
    />
    <input
        type="number"
        placeholder="Other Fee"
        value={bill.otherFee}
        onChange={(e) =>
            setBill({
                ...bill,
                otherFee: e.target.value
            })
        }
    />



    </div>

    

    <button onClick={() => onAdd(bill)}>Genarate Bill</button>
    </div>
  )
    



}

export default BillForm

