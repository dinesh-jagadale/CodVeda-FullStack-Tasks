/**
 * Rooms UI Logic
 * Hostel Management System
 */

const roomForm = document.getElementById("roomForm");
const roomTableBody = document.getElementById("roomTableBody");
const formMessage = document.getElementById("formMessage");

async function loadRooms() {
  const rooms = await getRooms();
  roomTableBody.innerHTML = "";

  if (rooms.length === 0) {
    roomTableBody.innerHTML =
      "<tr><td colspan='4'>No rooms found</td></tr>";
    return;
  }

  rooms.forEach(room => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${room.roomNumber}</td>
      <td>${room.capacity}</td>
      <td>${room.occupants}</td>
      <td>
        <button onclick="deleteRoomUI('${room.id}')">Delete</button>
      </td>
    `;
    roomTableBody.appendChild(row);
  });
}

roomForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const roomNumber = document.getElementById("roomNumber").value.trim();
  const capacity = document.getElementById("capacity").value;

  await addRoom({ roomNumber, capacity });
  roomForm.reset();
  showMessage("Room added successfully", "success");
  loadRooms();
});

async function deleteRoomUI(id) {
  await deleteRoom(id);
  showMessage("Room deleted successfully", "success");
  loadRooms();
}

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = `message ${type}`;
  setTimeout(() => formMessage.textContent = "", 3000);
}

loadRooms();
