//frontend/src/components/rector/AddRoomForm.jsx
import { useState } from "react";

const AddRoomForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    roomNumber: "",
    block: "",
    capacity: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ roomNumber: "", block: "", capacity: "" });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Room Number"
        value={form.roomNumber}
        onChange={(e) =>
          setForm({ ...form, roomNumber: e.target.value })
        }
      />

      <input
        placeholder="Block"
        value={form.block}
        onChange={(e) =>
          setForm({ ...form, block: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={(e) =>
          setForm({ ...form, capacity: e.target.value })
        }
      />

      <button>Add Room</button>
    </form>
  );
};

export default AddRoomForm;
