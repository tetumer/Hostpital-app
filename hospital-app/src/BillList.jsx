function BillList({ bill, patients, doctors }) {
  return (
    <div>
      <h2>Bills</h2>
      <ul>
        {bill.map((appt) => {
          const patient = patients.find((p) => p.id === Number(appt.patientId))
          const doctor = doctors.find((d) => d.id === Number(appt.doctorId))
          const total =
            Number(appt.consultationFee) +
            Number(appt.medicineFee) +
            Number(appt.labFee) +
            Number(appt.otherFee)

          return (
            <li key={appt.id}>
                {patient?.name}  
                <hr />
                Consultation Fee with {doctor?.name} is {appt.consultationFee}
                <br/>
                Medicine Fee is {appt.medicineFee}
                <br/>
                labFee is {appt.labFee}
                <br/>
                other Fees are {appt.otherFee}
                <hr />
                <strong>Total: {total} Tk</strong>                                  
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BillList

