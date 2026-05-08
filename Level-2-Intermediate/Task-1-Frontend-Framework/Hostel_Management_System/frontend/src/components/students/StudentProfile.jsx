//Hostel_Management_System\frontend\src\components\students\StudentProfile.jsx
const StudentProfile = ({ student }) => {
  return (
    <div>
      <h3>My Profile</h3>
      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Course:</b> {student.course}</p>
      <p><b>Year:</b> {student.year}</p>
      <p><b>Room NO:</b> {student.room?.roomNumber || "Not Assigned"}</p>
      <p><b>Role:</b> {student.role}</p>
    </div>
  );
};

export default StudentProfile;
