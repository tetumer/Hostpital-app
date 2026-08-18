function BillForm({
    billForm,
    setBillForm,
    onAdd,
    patients,
    doctors,
    editingId
}) {
    return (
        <div id="bill-form" className="container py-4">

            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <div className="mb-4">
                                <h2 className="mb-1">Generate Bill</h2>
                                <p className="text-muted mb-0">
                                    Create a bill for a patient's medical services.
                                </p>
                            </div>

                            <div className="row g-3">

                                {/* Patient */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Patient
                                    </label>

                                    <select
                                        className="form-select"
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
                                            <option
                                                key={patient.id}
                                                value={patient.id}
                                            >
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                {/* Doctor */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Doctor
                                    </label>

                                    <select
                                        className="form-select"
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
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                {/* Medicine Fee */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Medicine Fee
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">৳</span>

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={billForm.medicineFee}
                                            onChange={(e) =>
                                                setBillForm({
                                                    ...billForm,
                                                    medicineFee: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                </div>


                                {/* Other Fee */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Other Fee
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">৳</span>

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={billForm.otherFee}
                                            onChange={(e) =>
                                                setBillForm({
                                                    ...billForm,
                                                    otherFee: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className="d-flex justify-content-end mt-4">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={() => onAdd(billForm)}
                                >
                                    {editingId ? "Update Bill" : "Generate Bill"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default BillForm