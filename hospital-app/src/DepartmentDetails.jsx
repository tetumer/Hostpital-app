import { useParams, Link } from 'react-router-dom'

function DepartmentDetails() {
    const { id } = useParams()

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="mb-4">
                <h1 className="fw-bold mb-1">
                    Department Details
                </h1>

                <p className="text-muted">
                    View information about this hospital department.
                </p>
            </div>

            {/* Department Card */}
            <div className="card shadow-sm">

                <div className="card-body">

                    <h4 className="fw-semibold mb-3">
                        Department
                    </h4>

                    <div className="border rounded p-3 mb-4">
                        <span className="text-muted">
                            Department ID
                        </span>

                        <div className="fs-5 fw-semibold">
                            {id}
                        </div>
                    </div>

                    <Link
                        to="/departments"
                        className="btn btn-outline-primary"
                    >
                        ← Back to Departments
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default DepartmentDetails