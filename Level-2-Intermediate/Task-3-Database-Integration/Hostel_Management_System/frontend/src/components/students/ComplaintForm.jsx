//Hostel_Management_System\frontend\src\components\students\ComplaintForm.jsx
import { useState } from "react";

const ComplaintForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form onSubmit={(e)=>{e.preventDefault();onSubmit({subject,description});}}>
      <h3>Raise Complaint</h3>
      <input placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button>Submit</button>
    </form>
  );
};

export default ComplaintForm;
