import "./AdminFoodCard.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminFoodCard = ({ food, setMenu }) => {
  const { name, description, quantity, price, image_link } = food;
  const navigate = useNavigate();

  const deleteFood = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/sweets/${food._id}`, {
        withCredentials: true,
      });
      toast.success("Sweet deleted successfully");
      setMenu((prev) => prev.filter((item) => item._id !== food._id));
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="admin-food-card">
      <img src={image_link} alt={name} className="food-image" />

      <div className="food-details">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Price:</strong> ₹{price}
        </p>

        <div className="admin-buttons">
          <button
            className="edit-btn"
            onClick={() => {
              navigate(`/admin/update-food/${food._id}`);
            }}
          >
            Edit
          </button>
          <button className="delete-btn" onClick={deleteFood}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFoodCard;
