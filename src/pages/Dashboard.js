import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios.get(`${API}/api/dashboard`, {
      headers: { Authorization: token }
    })
    .then(res => {
      setUser(res.data);
      setCourse(res.data.course);
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/");
    })
    .finally(() => setLoading(false));
  }, [API, token, navigate]);

  const updatePassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      alert("Fill all password fields");
      return;
    }

    try {
      await axios.put(`${API}/api/update-password`, passwordData, {
        headers: { Authorization: token }
      });
      alert("Password updated");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Wrong password");
    }
  };

  const updateCourse = async () => {
    if (!course) {
      alert("Course cannot be empty");
      return;
    }

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

  if (loading) return <div className="container"><h3>Loading...</h3></div>;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Course:</b> {user.course}</p>

      <h3>Update Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        value={passwordData.oldPassword}
        onChange={e => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        value={passwordData.newPassword}
        onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
      />
      <button onClick={updatePassword}>Update Password</button>

      <h3>Update Course</h3>
      <input
        value={course}
        onChange={e => setCourse(e.target.value)}
      />
      <button onClick={updateCourse}>Update Course</button>

      <button
        onClick={logout}
        style={{ background: "#e53e3e", marginTop: "15px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;