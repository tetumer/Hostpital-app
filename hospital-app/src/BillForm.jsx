import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BillForm({ billForm, setBillForm, onAdd, patients, doctors }) {

  return (
    <div>
      <h1>Bill</h1>

    <select
        value={billForm.patientId}
        onChange={(e) =>
            setBillForm({
                ...billForm,
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
        value={billForm.doctorId}
        onChange={(e) =>
            setBillForm({
                ...billForm,
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
        value={billForm.consultationFee}
        onChange={(e) =>
            setBillForm({
                ...billForm,
                consultationFee: e.target.value
            })
        }
    />

        <input
        type="number"
        placeholder="Medicine Fee"
        value={billForm.medicineFee}
        onChange={(e) =>
            setBillForm({
                ...billForm,
                medicineFee: e.target.value
            })
        }
    />
    <input
        type="number"
        placeholder="Lab Fee"
        value={billForm.labFee}
        onChange={(e) =>
            setBillForm({
                ...billForm,
                labFee: e.target.value
            })
        }
    />
    <input
        type="number"
        placeholder="Other Fee"
        value={billForm.otherFee}
        onChange={(e) =>
            setBillForm({
                ...billForm,
                otherFee: e.target.value
            })
        }
    />



    </div>

    

    <button onClick={() => onAdd(billForm)}>Genarate Bill</button>
    </div>
  )
    



}

export default BillForm

