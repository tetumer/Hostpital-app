function BillList({
  bill,
  onEdit,
  onDelete,
  patients,
  doctors
}) {

  return (
    <div>

      <h2>Bills</h2>

      <ul>

        {bill.map((currentBill) => {

          const patient = patients.find(
            p => p.id === Number(currentBill.patientId)
          )

          const doctor = doctors.find(
            d => d.id === Number(currentBill.doctorId)
          )

          const total =
            Number(currentBill.consultationFee) +
            Number(currentBill.medicineFee) +
            Number(currentBill.labFee) +
            Number(currentBill.otherFee)

          return (

            <li key={currentBill.id}>

              <strong>
                {patient?.name}
              </strong>

              <hr />

              Consultation Fee with {doctor?.name}:
              {" "}{currentBill.consultationFee} Tk

              <br />

              Medicine Fee:
              {" "}{currentBill.medicineFee} Tk

              <br />

              Lab Fee:
              {" "}{currentBill.labFee} Tk

              <br />

              Other Fee:
              {" "}{currentBill.otherFee} Tk

              <hr />

              <strong>
                Total: {total} Tk
              </strong>

              <br />

              <button onClick={() => onEdit(currentBill)}>
                Edit
              </button>

              <button onClick={() => onDelete(currentBill.id)}>
                Delete
              </button>

            </li>

          )
        })}

      </ul>

    </div>
  )
}

export default BillList