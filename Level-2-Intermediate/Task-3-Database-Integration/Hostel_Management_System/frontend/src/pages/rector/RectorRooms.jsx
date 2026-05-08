import { useEffect, useState } from "react";
import {
  getRooms,
  createRoom,
  deleteRoom
} from "../../services/roomService";

const RectorRooms = () => {

  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [block, setBlock] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data || []);
    } catch (error) {
      console.error("Load rooms error:", error);
    }
  };

  const handleAddRoom = async (e) => {
  e.preventDefault();

  console.log("Adding room...");

  try {
    const res = await createRoom({
      roomNumber,
      block,
      capacity: Number(capacity)
    });

    console.log("Room response:", res);

    // ✅ CLEAR INPUT FIELDS HERE
    setRoomNumber("");
    setCapacity("");
    setBlock("");

    // ✅ REFRESH DATA
    await loadRooms();

  } catch (error) {
    console.error("Add room error:", error.response?.data || error);
  }
};

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      setRooms(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Rooms</h3>

      <form className="card p-3 mt-3" onSubmit={handleAddRoom}>
        <div className="row g-2">

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Block" value={block} onChange={(e) => setBlock(e.target.value)} required />
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary w-100">
              Add Room
            </button>
          </div>

        </div>
      </form>

      <table className="table table-striped mt-4">
        <thead className="table-dark">
          <tr>
            <th>Room No</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => {

            const occupants = room.occupants?.length || 0;
            const capacity = room.capacity || 0;

            return (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{capacity}</td>
                <td>{occupants}</td>

                <td>
                  {occupants >= capacity ? (
                    <span className="badge bg-danger">Full</span>
                  ) : (
                    <span className="badge bg-success">Available</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default RectorRooms;