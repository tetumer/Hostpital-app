import { useState, useEffect } from 'react'
import NavBar from './NavBar'

function PrescriptionList() {

    const [prescriptions, setPrescriptions] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState(null)

    const [editingId, setEditingId] = useState(null)
    const [search, setSearch] = useState("")

    const emptyForm = {
        patientId: "",
        doctorId: "",
        medicine: "",
        dosage: "",
        duration: ""
    }

    const [prescriptionForm, setPrescriptionForm] =
        useState(emptyForm)


    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            setLoading(false)
            return
        }

        const authHeaders = {
            Authorization: `Bearer ${token}`
        }


        // ================= GET CURRENT USER =================

        fetch(
            'https://localhost:7172/api/user/me',
            {
                headers: authHeaders
            }
        )
            .then(async response => {

                if (!response.ok) {
                    const message = await response.text()
                    throw new Error(message)
                }

                return response.json()
            })
            .then(user => {

                console.log("CURRENT USER:", user)

                setRole(user.role)

            })
            .catch(error => {

                console.error(
                    "USER ERROR:",
                    error
                )

            })


        // ================= LOAD PATIENTS =================

        fetch(
            'https://localhost:7172/api/patient',
            {
                headers: authHeaders
            }
        )
            .then(async response => {

                if (!response.ok) {
                    throw new Error("Could not load patients.")
                }

                return response.json()
            })
            .then(data => {

                setPatients(data)

            })
            .catch(error => {

                console.error(
                    "PATIENT ERROR:",
                    error
                )

            })


        // ================= LOAD DOCTORS =================

        fetch(
            'https://localhost:7172/api/doctor',
            {
                headers: authHeaders
            }
        )
            .then(async response => {

                if (!response.ok) {
                    throw new Error("Could not load doctors.")
                }

                return response.json()
            })
            .then(data => {

                setDoctors(data)

            })
            .catch(error => {

                console.error(
                    "DOCTOR ERROR:",
                    error
                )

            })


        // ================= LOAD PRESCRIPTIONS =================

        fetch(
            'https://localhost:7172/api/prescription',
            {
                headers: authHeaders
            }
        )
            .then(async response => {

                if (!response.ok) {
                    const message = await response.text()
                    throw new Error(message)
                }

                return response.json()
            })
            .then(data => {

                setPrescriptions(data)

            })
            .catch(error => {

                console.error(
                    "PRESCRIPTION ERROR:",
                    error
                )

            })
            .finally(() => {

                setLoading(false)

            })

    }, [])


    // ================= ADD =================

    const handleAddPrescription = () => {

        const token = localStorage.getItem("token")

        const body = {

            patientId:
                Number(prescriptionForm.patientId),

            doctorId:
                Number(prescriptionForm.doctorId),

            medicine:
                prescriptionForm.medicine,

            dosage:
                prescriptionForm.dosage,

            duration:
                prescriptionForm.duration

        }


        fetch(
            'https://localhost:7172/api/prescription',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(body)

            }
        )
            .then(async response => {

                if (!response.ok) {

                    const message =
                        await response.text()

                    throw new Error(message)

                }

                return response.json()

            })
            .then(data => {

                setPrescriptions(current => [
                    ...current,
                    data
                ])

                setPrescriptionForm(emptyForm)

            })
            .catch(error => {

                alert(error.message)

            })

    }


    // ================= EDIT START =================

    const startEditing = (prescription) => {

        setEditingId(prescription.id)

        setPrescriptionForm({

            patientId:
                prescription.patientId,

            doctorId:
                prescription.doctorId,

            medicine:
                prescription.medicine || "",

            dosage:
                prescription.dosage || "",

            duration:
                prescription.duration || ""

        })

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }


    // ================= UPDATE =================

    const handleUpdatePrescription = () => {

        const token = localStorage.getItem("token")

        fetch(
            `https://localhost:7172/api/prescription/${editingId}`,
            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    id: editingId,

                    patientId:
                        Number(
                            prescriptionForm.patientId
                        ),

                    doctorId:
                        Number(
                            prescriptionForm.doctorId
                        ),

                    medicine:
                        prescriptionForm.medicine,

                    dosage:
                        prescriptionForm.dosage,

                    duration:
                        prescriptionForm.duration

                })

            }
        )
            .then(async response => {

                if (!response.ok) {

                    const message =
                        await response.text()

                    throw new Error(message)

                }

                return response.json()

            })
            .then(updatedPrescription => {

                setPrescriptions(current =>
                    current.map(prescription =>
                        prescription.id === editingId
                            ? updatedPrescription
                            : prescription
                    )
                )

                setEditingId(null)

                setPrescriptionForm(emptyForm)

            })
            .catch(error => {

                alert(error.message)

            })

    }


    // ================= DELETE =================

    const handleDeletePrescription = (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this prescription?"
            )
        ) {
            return
        }

        const token = localStorage.getItem("token")

        fetch(
            `https://localhost:7172/api/prescription/${id}`,
            {

                method: 'DELETE',

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }
        )
            .then(async response => {

                if (!response.ok) {

                    const message =
                        await response.text()

                    throw new Error(message)

                }

            })
            .then(() => {

                setPrescriptions(current =>
                    current.filter(
                        prescription =>
                            prescription.id !== id
                    )
                )

            })
            .catch(error => {

                alert(error.message)

            })

    }


    // ================= SEARCH =================

    const filteredPrescriptions =
        prescriptions.filter(prescription => {

            const patient =
                patients.find(
                    p =>
                        p.id ===
                        Number(
                            prescription.patientId
                        )
                )

            const doctor =
                doctors.find(
                    d =>
                        d.id ===
                        Number(
                            prescription.doctorId
                        )
                )

            const searchText =
                search.toLowerCase()

            return (

                patient?.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                doctor?.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                prescription.medicine
                    ?.toLowerCase()
                    .includes(searchText)

            )

        })


    // ================= LOADING =================

    if (loading || !role) {

        return (

            <div className="min-vh-100 bg-light">

                <NavBar />

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-muted mt-3">
                        Loading prescriptions...
                    </p>

                </div>

            </div>

        )

    }


    // ================= PERMISSIONS =================

    const canCreate =
        role === "Owner" ||
        role === "Receptionist" ||
        role === "Doctor"

    const canEdit =
        role === "Owner" ||
        role === "Receptionist" ||
        role === "Doctor"

    const canDelete =
        role === "Owner"


    return (

        <div className="min-vh-100 bg-light">

            <NavBar />

            <div className="container py-4">

                <div className="mb-4">

                    <h1 className="fw-bold mb-1">
                        Prescriptions
                    </h1>

                    <p className="text-muted mb-0">
                        View and manage prescriptions.
                    </p>

                </div>


                {/* ================= FORM ================= */}

                {canCreate && (

                    <div className="card border-0 shadow-sm mb-5">

                        <div className="card-header bg-white border-0 p-4">

                            <h4 className="fw-bold mb-1">

                                {editingId
                                    ? "Edit Prescription"
                                    : "Create Prescription"
                                }

                            </h4>

                            <p className="text-muted mb-0">

                                {editingId
                                    ? "Update prescription information."
                                    : "Enter medication information."
                                }

                            </p>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-3">


                                {/* DOCTOR */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Doctor
                                    </label>

                                    <select
                                        className="form-select"
                                        value={
                                            prescriptionForm.doctorId
                                        }
                                        onChange={e =>
                                            setPrescriptionForm({
                                                ...prescriptionForm,
                                                doctorId:
                                                    e.target.value
                                            })
                                        }
                                        disabled={
                                            role === "Doctor"
                                        }
                                    >

                                        <option value="">
                                            Select Doctor
                                        </option>

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


                                {/* PATIENT */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Patient
                                    </label>

                                    <select
                                        className="form-select"
                                        value={
                                            prescriptionForm.patientId
                                        }
                                        onChange={e =>
                                            setPrescriptionForm({
                                                ...prescriptionForm,
                                                patientId:
                                                    e.target.value
                                            })
                                        }
                                    >

                                        <option value="">
                                            Select Patient
                                        </option>

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


                                {/* MEDICINE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Medicine
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter medicine name"
                                        value={
                                            prescriptionForm.medicine
                                        }
                                        onChange={e =>
                                            setPrescriptionForm({
                                                ...prescriptionForm,
                                                medicine:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>


                                {/* DOSAGE */}

                                <div className="col-md-3">

                                    <label className="form-label fw-semibold">
                                        Dosage
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. 500mg"
                                        value={
                                            prescriptionForm.dosage
                                        }
                                        onChange={e =>
                                            setPrescriptionForm({
                                                ...prescriptionForm,
                                                dosage:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>


                                {/* DURATION */}

                                <div className="col-md-3">

                                    <label className="form-label fw-semibold">
                                        Duration
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. 7 days"
                                        value={
                                            prescriptionForm.duration
                                        }
                                        onChange={e =>
                                            setPrescriptionForm({
                                                ...prescriptionForm,
                                                duration:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>


                            <div className="d-flex gap-2 mt-4">

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={
                                        editingId
                                            ? handleUpdatePrescription
                                            : handleAddPrescription
                                    }
                                >

                                    {editingId
                                        ? "Update Prescription"
                                        : "Add Prescription"
                                    }

                                </button>


                                {editingId && (

                                    <button
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => {

                                            setEditingId(null)

                                            setPrescriptionForm(
                                                emptyForm
                                            )

                                        }}
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= RECORDS ================= */}

                <div className="card border-0 shadow-sm">

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Prescription Records
                                </h4>

                                <p className="text-muted mb-0">
                                    View available prescriptions.
                                </p>

                            </div>

                            <span className="badge bg-light text-dark border">
                                {filteredPrescriptions.length} Records
                            </span>

                        </div>


                        <div className="mt-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by patient, doctor, or medicine..."
                                value={search}
                                onChange={e =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    <div className="list-group list-group-flush">

                        {filteredPrescriptions.length === 0 ? (

                            <div className="p-5 text-center">

                                <h5 className="text-muted">
                                    No prescriptions found
                                </h5>

                            </div>

                        ) : (

                            filteredPrescriptions.map(
                                prescription => {

                                    const patient =
                                        patients.find(
                                            p =>
                                                p.id ===
                                                Number(
                                                    prescription.patientId
                                                )
                                        )

                                    const doctor =
                                        doctors.find(
                                            d =>
                                                d.id ===
                                                Number(
                                                    prescription.doctorId
                                                )
                                        )

                                    return (

                                        <div
                                            key={
                                                prescription.id
                                            }
                                            className="list-group-item p-4"
                                        >

                                            <div className="row align-items-center">

                                                <div className="col-lg-4 mb-3 mb-lg-0">

                                                    <h5 className="fw-semibold mb-1">

                                                        {patient?.name ||
                                                            "Unknown Patient"}

                                                    </h5>

                                                    <div className="text-muted small">

                                                        Prescribed by{" "}

                                                        <span className="fw-semibold">

                                                            {doctor?.name ||
                                                                "Unknown Doctor"}

                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="col-lg-3 mb-3 mb-lg-0">

                                                    <small className="text-muted d-block">
                                                        Medicine
                                                    </small>

                                                    <span className="fw-semibold">

                                                        {
                                                            prescription.medicine
                                                        }

                                                    </span>

                                                </div>


                                                <div className="col-lg-2 mb-3 mb-lg-0">

                                                    <small className="text-muted d-block">
                                                        Dosage
                                                    </small>

                                                    <span className="fw-semibold">

                                                        {
                                                            prescription.dosage
                                                        }

                                                    </span>

                                                </div>


                                                <div className="col-lg-1 mb-3 mb-lg-0">

                                                    <small className="text-muted d-block">
                                                        Duration
                                                    </small>

                                                    <span className="fw-semibold">

                                                        {
                                                            prescription.duration
                                                        }

                                                    </span>

                                                </div>


                                                {(canEdit ||
                                                    canDelete) && (

                                                        <div className="col-lg-2 text-lg-end">

                                                            <div className="d-flex justify-content-lg-end gap-2">

                                                                {canEdit && (

                                                                    <button
                                                                        className="btn btn-sm btn-outline-secondary"
                                                                        onClick={() =>
                                                                            startEditing(
                                                                                prescription
                                                                            )
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                )}


                                                                {canDelete && (

                                                                    <button
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() =>
                                                                            handleDeletePrescription(
                                                                                prescription.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>

                                                                )}

                                                            </div>

                                                        </div>

                                                    )}

                                            </div>

                                        </div>

                                    )

                                }

                            )

                        )}

                    </div>

                </div>

            </div>

        </div>

    )

}

export default PrescriptionList