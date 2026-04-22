import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API;

  const handleRegister = async () => {
    if (!data.name || !data.email || !data.password || !data.course) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/api/register`, data);

      alert("Registered Successfully");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <input
        placeholder="Course"
        value={data.course}
        onChange={e => setData({ ...data, course: e.target.value })}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;