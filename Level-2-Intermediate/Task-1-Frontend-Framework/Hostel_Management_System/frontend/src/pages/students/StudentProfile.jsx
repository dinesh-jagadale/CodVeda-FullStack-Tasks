import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/studentService";

const StudentProfile = () => {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    getMyProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        setError("Failed to load profile");
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // LOADING
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // ERROR
  if (error) {
    return (
      <p className="text-danger">
        {error}
      </p>
    );
  }

  // SAFETY CHECK
  if (!profile) {
    return <p>No profile data found</p>;
  }

  return (
    <div className="container">

      <h2 className="mb-4">
        Student Profile
      </h2>

      <div className="card shadow">

        <div className="card-body">

          <p>
            <b>Name:</b> {profile.name}
          </p>

          <p>
            <b>Email:</b> {profile.email}
          </p>

          <p>
            <b>Status:</b> {profile.status}
          </p>

          <p>
            <b>Role:</b> {profile.role}
          </p>

          <p>
            <b>Room:</b>{" "}

            {profile.room
              ? `${profile.room.block} - ${profile.room.roomNumber}`
              : "Not Assigned"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default StudentProfile;