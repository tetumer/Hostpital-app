function BillList({
    bill,
    onEdit,
    onDelete,
    patients,
    doctors
}) {
    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Bills</h2>
                    <p className="text-muted mb-0">
                        Manage patient billing records
                    </p>
                </div>

                <span className="badge text-bg-primary fs-6">
                    {bill.length} Bills
                </span>
            </div>

            {bill.length === 0 ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <h5>No bills found</h5>
                        <p className="text-muted mb-0">
                            There are currently no billing records.
                        </p>
                    </div>
                </div>
            ) : (

                <div className="row g-4">

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

                            <div
                                className="col-md-6 col-xl-4"
                                key={currentBill.id}
                            >

                                <div className="card h-100 border-0 shadow-sm">

                                    <div className="card-body p-4">

                                        {/* Patient */}
                                        <div className="d-flex justify-content-between align-items-start mb-3">

                                            <div>
                                                <h5 className="mb-1">
                                                    {patient?.name || "Unknown Patient"}
                                                </h5>

                                                <small className="text-muted">
                                                    Bill #{currentBill.id}
                                                </small>
                                            </div>

                                            <span className="badge text-bg-light">
                                                Medical Bill
                                            </span>

                                        </div>


                                        {/* Doctor */}
                                        <div className="mb-3">
                                            <small className="text-muted d-block">
                                                Doctor
                                            </small>

                                            <span className="fw-semibold">
                                                {doctor?.name || "Unknown Doctor"}
                                            </span>
                                        </div>


                                        <hr />


                                        {/* Fees */}
                                        <div className="mb-2 d-flex justify-content-between">
                                            <span>Consultation</span>
                                            <span>
                                                {currentBill.consultationFee} Tk
                                            </span>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <span>Medicine</span>
                                            <span>
                                                {currentBill.medicineFee} Tk
                                            </span>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <span>Lab</span>
                                            <span>
                                                {currentBill.labFee} Tk
                                            </span>
                                        </div>

                                        <div className="mb-3 d-flex justify-content-between">
                                            <span>Other</span>
                                            <span>
                                                {currentBill.otherFee} Tk
                                            </span>
                                        </div>


                                        <hr />


                                        {/* Total */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">

                                            <span className="fw-bold">
                                                Total
                                            </span>

                                            <span className="fs-5 fw-bold">
                                                {total} Tk
                                            </span>

                                        </div>


                                        {/* Actions */}
                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-outline-primary flex-fill"
                                                onClick={() => onEdit(currentBill)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-outline-danger flex-fill"
                                                onClick={() => onDelete(currentBill.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>

            )}

        </div>
    )
}

export default BillList