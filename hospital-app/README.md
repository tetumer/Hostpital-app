# Hospital Management System

A full-stack hospital management platform with role-based access control, built to
model how a real hospital's front desk, doctors, and administration actually work —
not just a CRUD demo.

Live roles: **Owner**, **Receptionist**, **Doctor**, and **Patient** — each sees a
different dashboard and different permissions, enforced on the backend, not just
hidden in the UI.

---

## What this is

A hospital needs to track patients, doctors, appointments, prescriptions, lab
reports, and billing — and different people need to see different things. A
receptionist books appointments but shouldn't see revenue. A doctor sees their own
patients, not everyone's. A patient sees only their own records. This project
builds that system end to end: database, API, and interface.

---

## Tech Stack

**Frontend:** React, React Router, Bootstrap
**Backend:** ASP.NET Core Web API, Entity Framework Core
**Database:** SQLite
**Auth:** Custom token-based authentication (random hashed session tokens, not JWT
— see *Design Decisions* below for why)

---

## Features

- **Patients** — full records (contact, medical history, insurance, assigned
  doctor), with role-restricted create/edit/delete
- **Doctors** — profiles, department, schedule, live availability toggle
- **Appointments** — booking with automatic conflict detection (rejects
  double-bookings for the same doctor within a 20-minute window)
- **Prescriptions & Lab Reports** — linked to both patient and doctor
- **Billing** — itemized fees per patient (consultation, medicine, lab, other)
- **Role-based dashboard** — the same `/dashboard` route returns entirely
  different data depending on who's logged in:
  - *Owner* — hospital-wide stats, revenue, charts (appointments by status,
    doctors by department, patients by status)
  - *Receptionist* — day-to-day operational view: appointments, doctor
    availability, admitted patients, billing totals — no financial charts
  - *Doctor* — only their own appointments and patients
  - *Patient* — only their own appointments, bills, and lab reports
- **Public landing page** — hospital info and a department directory, visible
  without logging in
- **Settings** — theme, language, and font preferences persisted per browser

---

## Design Decisions (and why)

**Opaque, database-backed session tokens.** Login generates a random token,
hashed and stored server-side, tied to that user. Every authenticated request
looks the token up against the database to resolve who's making it and what
their role is. This system doesn't need to be stateless across multiple
servers, so there was no real advantage to embedding claims in a signed token
— a lookup-based approach is simpler and, importantly, **instantly revocable**:
delete the row, the token is dead immediately, no waiting on an expiry window.

**First registered user becomes Owner.** There's no way to have an Owner
assign the first Owner — so the very first account created on an empty database
is automatically granted the Owner role. Every account after that is created
*by* an Owner, with an explicitly chosen role.

**Appointment conflict checking.** Booking an appointment checks existing
appointments for that doctor and rejects anything within a 20-minute window of
an existing booking — including on edit, correctly excluding the appointment's
own record from the conflict check against itself.

---

## Project Structure

```
hospital-app/
├── src/                     # React frontend
│   ├── PatientList.jsx
│   ├── DoctorList.jsx
│   ├── Appointments.jsx
│   ├── Dashboard.jsx
│   ├── NavBar.jsx
│   └── ...
└── backend/
    └── HospitalManagementAPI/
        ├── Controllers/     # API endpoints
        ├── Models/          # EF Core entities
        ├── Services/        # AuthService, token handling
        └── Migrations/      # EF Core migration history
```

---

## Running it locally

**Prerequisites:** Node.js, .NET SDK (check `HospitalManagementAPI.csproj` for the
exact target version), Git.

**Frontend:**
```bash
cd hospital-app
npm install
npm run dev
```

**Backend:**
```bash
cd backend/HospitalManagementAPI/HospitalManagementAPI
dotnet restore
dotnet tool install --global dotnet-ef
dotnet dev-certs https --trust
dotnet ef database update
dotnet run --launch-profile https
```

The frontend runs on `http://localhost:5173`, the API on
`https://localhost:7172`.

**First run:** with an empty database, register the first account through the
app — it will automatically become the Owner account. Create Receptionist and
Doctor accounts from the Owner dashboard afterward.

---

## What I'd do differently / next

- Hash passwords with a proper algorithm (currently plain text — fine for local
  development, not for anything real)
- Move from SQLite to a server-based database before any real deployment
- Add automated tests around the appointment conflict logic specifically, since
  it's the piece with the most edge cases

---

*Built as a learning project — first full-stack app combining React and
ASP.NET Core, including working through real infrastructure issues along the
way: database path resolution, launch profile configuration, and EF migration
management.*
