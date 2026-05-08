//C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\frontend\src\services\roomService.js
import api from "./api";

// Get all rooms
export const getRooms = async () => {
  const { data } = await api.get("/rooms");
  return data;
};

// Create room
export const createRoom = async (roomData) => {
  const { data } = await api.post("/rooms", roomData);
  return data;
};

// Delete room
export const deleteRoom = async (id) => {
  const { data } = await api.delete(`/rooms/${id}`);
  return data;
};

// Update room
export const updateRoom = async (id, roomData) => {
  const { data } = await api.put(`/rooms/${id}`, roomData);
  return data;
};