//Hostel_Management_System\frontend\src\components\rooms\RoomTable.jsx
const RoomTable = ({ rooms }) => {
  return (
    <div>
      <h3>Rooms</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Room</th>
            <th>Block</th>
            <th>Capacity</th>
            <th>Occupied</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.block}</td>
              <td>{room.capacity}</td>
              <td>{room.occupants.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
