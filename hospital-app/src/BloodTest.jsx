import { useState } from 'react'

function BloodTest({ onAdd, patients, doctors }) {
    const [report, setReport] = useState({
        patientId: "",
        doctorId: "",
        bloodType: "",
        neutrophils: "",
        lymphocytes: "",
        monocytes: "",
        eosinophils: "",
        basophils: "",
        totalCirEosinophils: "",
        rbcCount: "",
        hctOrPCV: "",
        mcv: "",
        mch: "",
        mchc: "",
        rdw_cv: "",
        rdw_sd: "",
        plateletCount: "",
        mpv: "",
        pdw: "",
        pct: "",
        p_lcr: "",
        p_lcc: "",
        date: ""
    })

    const handleSubmit = () => {
        const resultsString =
            `Neutrophils: ${report.neutrophils}, Lymphocytes: ${report.lymphocytes}, Monocytes: ${report.monocytes}, ` +
            `Eosinophils: ${report.eosinophils}, Basophils: ${report.basophils}, Total Cir. Eosinophils: ${report.totalCirEosinophils}, ` +
            `RBC Count: ${report.rbcCount}, HCT/PCV: ${report.hctOrPCV}, MCV: ${report.mcv}, MCH: ${report.mch}, MCHC: ${report.mchc}, ` +
            `RDW_CV: ${report.rdw_cv}, RDW_SD: ${report.rdw_sd}, Platelet Count: ${report.plateletCount}, MPV: ${report.mpv}, ` +
            `PDW: ${report.pdw}, PCT: ${report.pct}, P_LCR: ${report.p_lcr}, P_LCC: ${report.p_lcc}`

        onAdd({
            patientId: report.patientId,
            doctorId: report.doctorId,
            bloodType: report.bloodType,
            results: resultsString,
            date: report.date
        })
    }

    const updateField = (field, value) => {
        setReport({
            ...report,
            [field]: value
        })
    }

    const numberField = (label, field, step = "any") => (
        <div className="col-md-6 col-lg-4">
            <label className="form-label">{label}</label>
            <input
                type="number"
                min="0"
                step={step}
                className="form-control"
                value={report[field]}
                onChange={(e) => updateField(field, e.target.value)}
            />
        </div>
    )

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="mb-4">
                <h1 className="fw-bold mb-1">Blood Test Report</h1>
                <p className="text-muted mb-0">
                    Enter the patient's complete blood test information.
                </p>
            </div>

            {/* Patient Information */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Patient Information</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">Patient</label>
                            <select
                                className="form-select"
                                value={report.patientId}
                                onChange={(e) =>
                                    updateField("patientId", e.target.value)
                                }
                            >
                                <option value="">Select Patient</option>

                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Doctor</label>
                            <select
                                className="form-select"
                                value={report.doctorId}
                                onChange={(e) =>
                                    updateField("doctorId", e.target.value)
                                }
                            >
                                <option value="">Select Doctor</option>

                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Blood Type</label>
                            <select
                                className="form-select"
                                value={report.bloodType}
                                onChange={(e) =>
                                    updateField("bloodType", e.target.value)
                                }
                            >
                                <option value="">Select Blood Type</option>
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

                        <div className="col-md-6">
                            <label className="form-label">Test Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={report.date}
                                onChange={(e) =>
                                    updateField("date", e.target.value)
                                }
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* WBC */}
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">White Blood Cell (WBC) Analysis</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        {numberField("Neutrophils", "neutrophils")}
                        {numberField("Lymphocytes", "lymphocytes")}
                        {numberField("Monocytes", "monocytes")}
                        {numberField("Eosinophils", "eosinophils")}
                        {numberField("Basophils", "basophils")}
                        {numberField(
                            "Total Circulating Eosinophils",
                            "totalCirEosinophils"
                        )}

                    </div>
                </div>
            </div>

            {/* RBC */}
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Red Blood Cell (RBC) Analysis</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        {numberField("RBC Count", "rbcCount")}
                        {numberField("HCT / PCV", "hctOrPCV")}
                        {numberField("MCV", "mcv")}
                        {numberField("MCH", "mch")}
                        {numberField("MCHC", "mchc")}
                        {numberField("RDW-CV", "rdw_cv")}
                        {numberField("RDW-SD", "rdw_sd")}

                    </div>
                </div>
            </div>

            {/* Platelets */}
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Platelet Analysis</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        {numberField("Platelet Count", "plateletCount")}
                        {numberField("MPV", "mpv")}
                        {numberField("PDW", "pdw")}
                        {numberField("PCT", "pct")}
                        {numberField("P-LCR", "p_lcr")}
                        {numberField("P-LCC", "p_lcc")}

                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-end gap-2 mb-4">
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleSubmit}
                >
                    Save Blood Test Report
                </button>
            </div>

        </div>
    )
}

export default BloodTest