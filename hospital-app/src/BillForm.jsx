function BillForm({
  billForm,
  setBillForm,
  onAdd,
  patients,
  doctors
}) {

  return (
    <div>

      <h2>Generate Bill</h2>

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

        {patients.map(patient => (
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

        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>


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
        placeholder="Other Fee"
        value={billForm.otherFee}
        onChange={(e) =>
          setBillForm({
            ...billForm,
            otherFee: e.target.value
          })
        }
      />


      <button onClick={() => onAdd(billForm)}>
        Generate Bill
      </button>

    </div>
  )
}

export default BillForm