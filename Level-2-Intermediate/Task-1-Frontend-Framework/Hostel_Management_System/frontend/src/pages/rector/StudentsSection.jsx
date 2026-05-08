import { useEffect, useState } from "react";
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
  createStudent
} from "../../services/rectorService";

import { getRooms } from "../../services/roomService";

const StudentsSection = () => {

  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const [editRoom, setEditRoom] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const roomsData = await getRooms();
      setRooms(roomsData || []);
    } catch (error) {
      console.error("Rooms load error:", error);
    }

    try {
      const studentsData = await getAllStudents();
      setStudents(studentsData || []);
    } catch (error) {
      console.error("Students load error:", error);
    }
  };

  // ADD STUDENT
  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      await createStudent({
        name,
        email,
        password,
        roomId: selectedRoom
      });

      await loadData();

      setName("");
      setEmail("");
      setPassword("");
      setSelectedRoom("");

    } catch (error) {
      console.error("Add student error:", error);
    }
  };

  // DELETE STUDENT
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      await deleteStudent(id);

      // reload fresh data
      await loadData();

    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  // START EDIT
  const startEdit = (student) => {
    setEditingStudent(student._id);
    setEditName(student.name);
    setEditEmail(student.email);
    setEditPassword(student.password || "");
    setEditRoom(student.room?._id || "");
  };

  // UPDATE STUDENT
  const handleUpdate = async () => {

    try {

      await updateStudent(
      editingStudent,
      {
        name:
          editName,

        email:
          editEmail,

        password:
          editPassword,

        room:
          editRoom,
      }
    );

      setEditingStudent(null);

      await loadData();

    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container mt-4">

      <h3>Students</h3>

      {/* ADD STUDENT FORM */}
      <form
        className="card p-3 mt-3 mb-4"
        onSubmit={handleAddStudent}
      >

        <div className="row g-2">

          {/* NAME */}
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="col-md-3">
            <input
              type="password"
              className="form-control"
              placeholder="Student Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ROOM */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            >
              <option value="">Select Room</option>

              {rooms.map((r) => {

                const occupants = Array.isArray(r.occupants)
                  ? r.occupants.length
                  : 0;

                const capacity = r.capacity || 1;

                const isFull = occupants >= capacity;

                return (
                  <option
                    key={r._id}
                    value={r._id}
                    disabled={isFull}
                  >
                    {r.roomNumber} ({occupants}/{capacity})
                    {isFull ? " - Full" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* BUTTON */}
          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Add Student
            </button>
          </div>

        </div>
      </form>

      {/* TABLE */}
      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s) => (

            <tr key={s._id}>

              {/* NAME */}
              <td>
                {editingStudent === s._id ? (
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  s.name
                )}
              </td>

              {/* EMAIL */}
              <td>
                {editingStudent === s._id ? (
                  <input
                    className="form-control"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  s.email
                )}
              </td>

              {/* ROOM */}
              <td>

  {editingStudent === s._id ? (

    <select
      className="form-select"
      value={editRoom}
      onChange={(e) =>
        setEditRoom(
          e.target.value
        )
      }
    >

      <option value="">
        Select Room
      </option>

      {rooms.map((r) => (

        <option
          key={r._id}
          value={r._id}
        >
          {r.roomNumber}
        </option>

      ))}

    </select>

  ) : (

    s.room?.roomNumber
    || "Not Assigned"

  )}

</td>

              {/* PASSWORD */}
              <td>

  {editingStudent === s._id ? (

    <input
      type="text"
      className="form-control"
      value={editPassword}
      onChange={(e) =>
        setEditPassword(
          e.target.value
        )
      }
    />

  ) : (

    s.password || "******"

  )}

</td>

              {/* STATUS */}
              <td>
                {s.isApproved ? (
                  <span className="badge bg-success">
                    Approved
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    Pending
                  </span>
                )}
              </td>

              {/* ACTIONS */}
              <td>

                {editingStudent === s._id ? (
                  <>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingStudent(null)}
                    >
                      Cancel
                    </button>

                  </>
                ) : (
                  <>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => startEdit(s)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>

                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default StudentsSection;