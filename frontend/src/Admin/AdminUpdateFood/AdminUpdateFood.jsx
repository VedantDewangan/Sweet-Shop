import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Auth/AuthContext";

export default function AdminUpdateFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const categories = ["Chocolate", "Candy", "Lollipop", "Cake", "Pastry"];
  const [loading, setLoading] = useState(false);
  const [restockLoading, setRestockLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_link, setImageLink] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [restockQty, setRestockQty] = useState("");

  useEffect(() => {
    if (user.email !== "candy@admin.com") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getFoodData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/sweets", {
          withCredentials: true,
        });

        const food = data.all_sweet.find((item) => item._id === id);
        if (food) {
          setName(food.name);
          setDescription(food.description);
          setImageLink(food.image_link);
          setCategory(food.category);
          setPrice(food.price);
          setQuantity(food.quantity);
        } else {
          toast.error("Food item not found");
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch food data");
      }
    };
    getFoodData();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/sweets/${id}`,
        {
          name,
          description,
          price,
          image_link,
          category,
          quantity,
        },
        { withCredentials: true }
      );
      toast.success("Sweet updated successfully!");
    } catch (error) {
      toast.error("Failed to update sweet");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    setRestockLoading(true);

    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/sweets/${id}/restock`,
        { new_quantity: restockQty },
        { withCredentials: true }
      );

      setQuantity(restockQty);
      setRestockQty("");
      toast.success("Quantity restocked successfully!");
    } catch (error) {
      toast.error("Failed to restock quantity");
      console.error(error);
    } finally {
      setRestockLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="admin-controls" style={{ margin: "1rem 3rem" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      <div className="form-container">
        <form className="update-form" onSubmit={handleUpdate}>
          <h2>Update Sweet Details</h2>

          <div className="form-group">
            <label htmlFor="name">Sweet Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image_link}
              onChange={(e) => setImageLink(e.target.value)}
              required
            />
          </div>

          {image_link && (
            <img
              src={image_link}
              alt="Sweet preview"
              style={{
                maxWidth: "200px",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            />
          )}

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <strong>Current Quantity:</strong> {quantity}
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Sweet"}
          </button>
        </form>
      </div>

      <div className="form-container">
        <form
          className="restock-form"
          onSubmit={handleRestock}
          style={{ marginTop: "2rem" }}
        >
          <h2>Restock Quantity</h2>

          <div className="form-group">
            <label htmlFor="restockQty">Change Quantity:</label>
            <input
              type="number"
              id="restockQty"
              name="restockQty"
              value={restockQty}
              onChange={(e) => setRestockQty(e.target.value)}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={restockLoading}
          >
            {restockLoading ? "Restocking..." : "Restock"}
          </button>
        </form>
      </div>
    </div>
  );
}
