import { useEffect, useState } from "react";

import {
  createComplaint,
  getMyComplaints,
} from "../../services/complaintService";

const StudentComplaints = () => {

  const [subject, setSubject] = useState("");

  const [description, setDescription] = useState("");

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {

    try {

      const data = await getMyComplaints();

      setComplaints(data || []);

    } catch (error) {

      console.log(error);

    }
  };

  // SUBMIT COMPLAINT
  const submitComplaint = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createComplaint({
        subject,
        description,
      });

      setSubject("");
      setDescription("");

      await loadComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to submit complaint");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Student Complaints
      </h2>

      {/* COMPLAINT FORM */}
      <div className="card shadow mb-4">

        <div className="card-body">

          <form onSubmit={submitComplaint}>

            {/* SUBJECT */}
            <div className="mb-3">

              <label className="form-label">
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                required
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">

              <label className="form-label">
                Complaint Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>

            <button
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Complaint"}
            </button>

          </form>

        </div>

      </div>

      {/* COMPLAINT LIST */}
      <div className="card shadow">

        <div className="card-body">

          <h4 className="mb-3">
            My Complaints
          </h4>

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {complaints.length > 0 ? (

                complaints.map((c) => (

                  <tr key={c._id}>

                    <td>{c.subject}</td>

                    <td>{c.description}</td>

                    <td>

                      {c.status === "resolved" ? (

                        <span className="badge bg-success">
                          Resolved
                        </span>

                      ) : (

                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center"
                  >
                    No complaints found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default StudentComplaints;