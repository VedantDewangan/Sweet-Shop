import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminHome.css";
import axios from "axios";
import AdminFoodCard from "../../components/AdminCard/AdminFoodCard";
import { useAuth } from "../../Auth/AuthContext";

export default function AdminHome() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user.email !== "candy@admin.com") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getAllFood = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/sweets", {
          withCredentials: true,
        });
        setMenu(data.all_sweet);
      } catch (error) {
        console.log(error);
      }
    };

    getAllFood();
  }, []);

  return (
    <div className="page admin-page">
      <Navbar />

      <div className="admin-controls">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
        <button className="add-btn" onClick={() => navigate("/admin/add-page")}>
          ＋ Add New
        </button>
      </div>

      <div className="all-food-con">
        {menu.map((obj) => (
          <AdminFoodCard
            key={obj._id || obj.name}
            setMenu={setMenu}
            food={obj}
          />
        ))}
      </div>
    </div>
  );
}
