/**
 * Students UI Logic
 * Hostel Management System
 */

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const roomSelect = document.getElementById("room");
const formMessage = document.getElementById("formMessage");

async function loadAvailableRooms() {
  const rooms = await getRooms();

  roomSelect.innerHTML = `<option value="">Select Available Room</option>`;

  rooms.forEach(room => {
    if (room.occupants < room.capacity) {
      const option = document.createElement("option");
      option.value = room.roomNumber;
      option.textContent =
        `${room.roomNumber} (${room.capacity - room.occupants} slots left)`;
      roomSelect.appendChild(option);
    }
  });
}

async function loadStudents() {
  const students = await getStudents();
  studentTableBody.innerHTML = "";

  if (students.length === 0) {
    studentTableBody.innerHTML =
      "<tr><td colspan='4'>No students found</td></tr>";
    return;
  }

  students.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.room}</td>
      <td>
        <button onclick="deleteStudentUI('${student.id}')">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const room = roomSelect.value;

  if (!name || !email || !room) {
    showMessage("All fields are required", "error");
    return;
  }

  await addStudent({ name, email, room });
  studentForm.reset();
  showMessage("Student added successfully", "success");
  loadStudents();
  loadAvailableRooms();
});

async function deleteStudentUI(id) {
  await deleteStudent(id);
  showMessage("Student deleted successfully", "success");
  loadStudents();
  loadAvailableRooms();
}

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = `message ${type}`;
  setTimeout(() => formMessage.textContent = "", 3000);
}

loadStudents();
loadAvailableRooms();
