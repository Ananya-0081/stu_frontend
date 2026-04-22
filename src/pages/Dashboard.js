import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    axios.get(`${API}/api/dashboard`, {
      headers: { Authorization: token }
    })
    .then(res => {
      setUser(res.data);
      setCourse(res.data.course);
    })
    .catch(() => navigate("/"));
  }, [API, token, navigate]);

  const updatePassword = async () => {
    try {
      await axios.put(`${API}/api/update-password`, passwordData, {
        headers: { Authorization: token }
      });
      alert("Password updated");
    } catch {
      alert("Wrong password");
    }
  };

  const updateCourse = async () => {
    try {
      await axios.put(`${API}/api/update-course`, { course }, {
        headers: { Authorization: token }
      });
      alert("Course updated");
    } catch {
      alert("Error updating course");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Course: {user.course}</p>

      <h3>Update Password</h3>
      <input
        placeholder="Old Password"
        onChange={e => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
      />
      <input
        placeholder="New Password"
        onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
      />
      <button onClick={updatePassword}>Update</button>

      <h3>Update Course</h3>
      <input value={course} onChange={e => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Change</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;