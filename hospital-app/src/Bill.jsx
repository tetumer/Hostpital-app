import { useState, useEffect } from 'react'
import BillForm from './BillForm'
import BillList from './BillList'

function Bill() {

  const [bill, setBill] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [labReports, setLabReports] = useState([])

  const [role, setRole] = useState(null)

  const [editingId, setEditingId] = useState(null)

  const [billForm, setBillForm] = useState({
    patientId: "",
    doctorId: "",
    consultationFee: "",
    medicineFee: "",
    labFee: "",
    otherFee: ""
  })

  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    const headers = {
      Authorization: `Bearer ${ token } `
    }


    // =========================
    // GET ROLE
    // =========================

    fetch('https://localhost:7172/api/dashboard', {
      headers
    })
      .then(async response => {

        if (!response.ok) {
          throw new Error("Could not get user information.")
        }

        return response.json()

      })
      .then(data => {

        setRole(data.welcome.role)

      })
      .catch(error => {

        console.error("ROLE ERROR:", error)

      })


    // =========================
    // GET BILLING
    // Backend filters this
    // based on role.
    // =========================

    fetch('https://localhost:7172/api/billing', {
      headers
    })
      .then(async response => {

        if (!response.ok) {
          throw new Error("Could not load billing.")
        }

        return response.json()

      })
      .then(data => {

        setBill(data)

      })
      .catch(error => {

        console.error("BILLING ERROR:", error)

      })


    // =========================
    // PATIENTS
    // Only needed for form
    // =========================

    if (role === "Owner" || role === "Receptionist") {

      fetch('https://localhost:7172/api/patient', {
        headers
      })
        .then(response => response.json())
        .then(data => {

          setPatients(data)

        })
        .catch(error => {

          console.error("PATIENT ERROR:", error)

        })


      // =========================
      // DOCTORS
      // =========================

      fetch('https://localhost:7172/api/doctor', {
        headers
      })
        .then(response => response.json())
        .then(data => {

          setDoctors(data)

        })
        .catch(error => {

          console.error("DOCTOR ERROR:", error)

        })


      // =========================
      // APPOINTMENTS
      // Used for consultation fee
      // =========================

      fetch('https://localhost:7172/api/appointment', {
        headers
      })
        .then(response => response.json())
        .then(data => {

          setAppointments(data)

        })
        .catch(error => {

          console.error("APPOINTMENT ERROR:", error)

        })


      // =========================
      // LAB REPORTS
      // Used for lab fee
      // =========================

      fetch('https://localhost:7172/api/bloodtest', {
        headers
      })
        .then(response => response.json())
        .then(data => {

          setLabReports(data)

        })
        .catch(error => {

          console.error("LAB ERROR:", error)

        })

    }

    setLoading(false)

  }, [])


  // =====================================================
  // FEES
  // =====================================================

  const calculateConsultationFee = (patientId, doctorId) => {

    const completedAppointments = appointments.filter(
      appointment =>
        Number(appointment.patientId) === Number(patientId) &&
        Number(appointment.doctorId) === Number(doctorId) &&
        appointment.status === "Completed"
    )

    if (completedAppointments.length === 0) {
      return 0
    }

    if (completedAppointments.length > 1) {
      return 300
    }

    return 500
  }


  const calculateLabFee = (patientId) => {

    const reports = labReports.filter(
      report =>
        Number(report.patientId) === Number(patientId)
    )

    let total = 0

    reports.forEach(report => {

      if (report.results === "Blood group test only") {
        total += 50
      } else {
        total += 5000
      }

    })

    return total
  }


  // =====================================================
  // CREATE
  // Owner + Receptionist
  // =====================================================

  const handleAddBill = (newBill) => {

    const token = localStorage.getItem("token")

    const consultationFee =
      calculateConsultationFee(
        newBill.patientId,
        newBill.doctorId
      )

    const labFee =
      calculateLabFee(newBill.patientId)


    fetch('https://localhost:7172/api/billing', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token } `
      },

      body: JSON.stringify({

        patientId: Number(newBill.patientId),

        doctorId: Number(newBill.doctorId),

        consultationFee: consultationFee,

        medicineFee:
          Number(newBill.medicineFee) || 0,

        labFee: labFee,

        otherFee:
          Number(newBill.otherFee) || 0

      })

    })

      .then(async response => {

        if (!response.ok) {

          const message =
            await response.text()

          throw new Error(message)

        }

        return response.json()

      })

      .then(data => {

        setBill(current => [
          ...current,
          data
        ])

        setBillForm({
          patientId: "",
          doctorId: "",
          consultationFee: "",
          medicineFee: "",
          labFee: "",
          otherFee: ""
        })

      })

      .catch(error => {

        alert(error.message)

      })

  }


  // =====================================================
  // DELETE
  // Owner ONLY
  // =====================================================

  const handleDeleteBill = (id) => {

    const token = localStorage.getItem("token")

    fetch(
      `https://localhost:7172/api/billing/${id}`,
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

        setBill(current =>
            current.filter(
                b => b.id !== id
            )
        )

    })

    .catch(error => {

        alert(error.message)

    })

  }


// =====================================================
// EDIT
// Owner + Receptionist
// =====================================================

const startEditing = (currentBill) => {

    setEditingId(currentBill.id)

    setBillForm({

        patientId: currentBill.patientId,

        doctorId: currentBill.doctorId,

        consultationFee:
            currentBill.consultationFee,

        medicineFee:
            currentBill.medicineFee,

        labFee:
            currentBill.labFee,

        otherFee:
            currentBill.otherFee

    })

    setTimeout(() => {

        document
            .getElementById("bill-form")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })

    }, 0)

}


// =====================================================
// UPDATE
// Owner + Receptionist
// =====================================================

const handleUpdateBill = () => {

    const token = localStorage.getItem("token")

    fetch(
        `https://localhost:7172/api/billing/${editingId}`,
        {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({

                id: editingId,

                patientId:
                    Number(billForm.patientId),

                doctorId:
                    Number(billForm.doctorId),

                consultationFee:
                    Number(billForm.consultationFee),

                medicineFee:
                    Number(billForm.medicineFee),

                labFee:
                    Number(billForm.labFee),

                otherFee:
                    Number(billForm.otherFee)

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

        .then(updatedBill => {

            setBill(current =>
                current.map(b =>
                    b.id === editingId
                        ? updatedBill
                        : b
                )
            )

            setEditingId(null)

            setBillForm({
                patientId: "",
                doctorId: "",
                consultationFee: "",
                medicineFee: "",
                labFee: "",
                otherFee: ""
            })

        })

        .catch(error => {

            alert(error.message)

        })

}


// =====================================================
// LOADING
// =====================================================

if (loading || !role) {

    return <p>Loading...</p>

}


const canEdit =
    role === "Owner" ||
    role === "Receptionist"

const canDelete =
    role === "Owner"


return (

    <div>

        {/* =========================
          FORM
          Owner + Receptionist
          ========================= */}

        {canEdit && (

            <BillForm

                billForm={billForm}

                setBillForm={setBillForm}

                onAdd={
                    editingId
                        ? handleUpdateBill
                        : handleAddBill
                }

                patients={patients}

                doctors={doctors}

                editingId={editingId}

            />

        )}


        {/* =========================
          LIST
          Everyone
          ========================= */}

        <BillList

            bill={bill}

            patients={patients}

            doctors={doctors}

            onEdit={
                canEdit
                    ? startEditing
                    : undefined
            }

            onDelete={
                canDelete
                    ? handleDeleteBill
                    : undefined
            }

        />

    </div>

)

}

export default Bill
