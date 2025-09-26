import "./Login.css";
import img from "../../public/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    try {
      e.preventDefault();
      if (loading) return;
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setUser(data.user);
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
      <h2>Welcome back</h2>
      <p>Sign in to your account</p>
      <form onSubmit={login}>
        <div>
          <i className="fa-solid fa-envelope"></i>
          <input
            type="email"
            placeholder="Enter Email"
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
        <Link to={"/register"}>Don't have an account?</Link>
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
      </form>
      <div className="auth-box-1"></div>
    </div>
  );
}
