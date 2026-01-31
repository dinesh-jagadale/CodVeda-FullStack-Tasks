/**
 * API Service
 * AI-Powered Hostel Management System
 * Level-1 Task-3
 */

const BASE_URL = "http://localhost:5000/api";

/* ================================
   STUDENT APIs
================================ */

/**
 * Fetch all students
 */
async function getStudents() {
  const response = await fetch(`${BASE_URL}/students`);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

/**
 * Add a new student
 */
async function addStudent(studentData) {
  const response = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add student");
  }

  return response.json();
}

/**
 * Delete a student by ID
 */
async function deleteStudent(studentId) {
  const response = await fetch(`${BASE_URL}/students/${studentId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete student");
  }

  return response.json();
}

/* ================================
   ROOM APIs
================================ */

/**
 * Fetch all rooms
 */
async function getRooms() {
  const response = await fetch(`${BASE_URL}/rooms`);
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return response.json();
}

/**
 * Add a new room
 */
async function addRoom(roomData) {
  const response = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(roomData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add room");
  }

  return response.json();
}

/**
 * Delete a room by ID
 */
async function deleteRoom(roomId) {
  const response = await fetch(`${BASE_URL}/rooms/${roomId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete room");
  }

  return response.json();
}
