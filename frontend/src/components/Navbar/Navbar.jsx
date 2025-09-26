import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import img from "../../public/logo.png";
import axios from "axios";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      if (loading) return;
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={img} alt="" />
      </Link>
      <span>
        <Link to={"/menu"}>Menu</Link>
        <p>Welcome back, {user.name}</p>
        <button onClick={logout}>{loading ? "Loading" : "logout"}</button>
      </span>
    </div>
  );
}
