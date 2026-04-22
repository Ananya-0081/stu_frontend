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

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/api/register`, data);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      if (err.response?.data?.msg) {
        alert(err.response.data.msg);
      } else {
        alert("Error registering user");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <input
        placeholder="Course"
        onChange={e => setData({ ...data, course: e.target.value })}
      />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;