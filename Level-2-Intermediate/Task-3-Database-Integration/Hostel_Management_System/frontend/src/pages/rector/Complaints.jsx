import { useEffect, useState } from "react";

import {
  getAllComplaints,
  updateComplaintStatus,
} from "../../services/complaintService";

const Complaints = () => {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  // LOAD ALL COMPLAINTS
  const loadComplaints = async () => {

    try {

      const data = await getAllComplaints();

      setComplaints(data || []);

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE STATUS
  const changeStatus = async (
    id,
    status
  ) => {

    try {

      await updateComplaintStatus(
        id,
        status
      );

      await loadComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to update status");

    }
  };

  return (
    <div className="container mt-4">

      <h3>Complaints</h3>

      <table className="table table-bordered mt-3">

        <thead className="table-dark">

          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {complaints.length > 0 ? (

            complaints.map((c) => (

              <tr key={c._id}>

                <td>
                  {c.student?.name}
                </td>

                <td>
                  {c.subject}
                </td>

                <td>
                  {c.description}
                </td>

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

                <td>

                  {c.status !== "resolved" && (

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        changeStatus(
                          c._id,
                          "resolved"
                        )
                      }
                    >
                      Mark Resolved
                    </button>

                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="5"
                className="text-center"
              >
                No complaints found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default Complaints;