import img from "../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(false);

  const register = async (e) => {
    try {
      e.preventDefault();
      if (laoding) return;
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: fullName,
          email: email,
          password: password,
        }
      );

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <img src={img} alt="logo" />
      <h2>Create your account</h2>
      <p>Join our sweet community today</p>
      <form onSubmit={register}>
        <div>
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Enter your Full Name"
            required
            autoComplete="off"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <i className="fa-solid fa-envelope"></i>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Enter Password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/login">Already have an account?</Link>
        <button type="submit">
          {laoding ? "Loading..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
