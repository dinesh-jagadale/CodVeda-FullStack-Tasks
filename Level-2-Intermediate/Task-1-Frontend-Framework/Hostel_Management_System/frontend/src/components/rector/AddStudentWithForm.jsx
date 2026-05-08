//Hostel_Management_System\frontend\src\components\rector\AddStudentWithForm.jsx
import { useState } from "react";

const AddStudentWithRoomForm = ({ rooms, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    course: "",
    year: "",
    roomId: ""
  });

  const availableRooms = rooms.filter((r) => {
    const occupants = Array.isArray(r.occupants) ? r.occupants.length : 0;
    return occupants < r.capacity;
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.roomId) {
      alert("Please select a room");
      return;
    }

    onAdd(form);

    setForm({
      name: "",
      rollNo: "",
      email: "",
      course: "",
      year: "",
      roomNo: ""
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Add Student & Assign Room</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Roll No"
        value={form.rollNo}
        onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        required
      />

      <input
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        required
      />

      <select
        value={form.roomId}
        onChange={(e) => setForm({ ...form, roomId: e.target.value })}
        required
      >
        <option value="">Select Available Room</option>
        {availableRooms.map((r) => (
          <option key={r._id} value={r._id}>
            Room {r.roomNumber} ({occupants = Array.isArray(r.occupants) ? r.occupants.length : 0}/{r.capacity})
          </option>
        ))}
      </select>

      <button>Add Student</button>
    </form>
  );
};

export default AddStudentWithRoomForm;