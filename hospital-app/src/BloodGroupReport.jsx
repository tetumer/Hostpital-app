import { useState } from 'react'

function BloodGroupReport({ onAdd, patients, doctors }) {
    const [report, setReport] = useState({
        patientId: "",
        doctorId: "",
        bloodType: "",
        date: ""
    })

    const handleSubmit = () => {
        onAdd({
            patientId: report.patientId,
            doctorId: report.doctorId,
            bloodType: report.bloodType,
            results: "Blood group test only",
            date: report.date
        })
    }

    return (
        <div className="container py-4">

            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <div className="mb-4">
                                <h2 className="mb-1">
                                    Blood Group Test Report
                                </h2>

                                <p className="text-muted mb-0">
                                    Record a patient's blood group test.
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
                                        value={report.patientId}
                                        onChange={(e) =>
                                            setReport({
                                                ...report,
                                                patientId: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">
                                            Select Patient
                                        </option>

                                        {patients.map((patient) => (
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
                                        value={report.doctorId}
                                        onChange={(e) =>
                                            setReport({
                                                ...report,
                                                doctorId: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">
                                            Select Doctor
                                        </option>

                                        {doctors.map((doctor) => (
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                {/* Date */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Test Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={report.date}
                                        onChange={(e) =>
                                            setReport({
                                                ...report,
                                                date: e.target.value
                                            })
                                        }
                                    />
                                </div>


                                {/* Blood Type */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Blood Type
                                    </label>

                                    <select
                                        className="form-select"
                                        value={report.bloodType}
                                        onChange={(e) =>
                                            setReport({
                                                ...report,
                                                bloodType: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">
                                            Select Blood Type
                                        </option>

                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>

                            </div>


                            <div className="d-flex justify-content-end mt-4">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={handleSubmit}
                                >
                                    Save Report
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default BloodGroupReport