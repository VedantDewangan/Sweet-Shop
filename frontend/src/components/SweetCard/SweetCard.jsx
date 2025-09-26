import { useState } from "react";
import "./SweetCard.css";
import axios from "axios";

const SweetCard = ({ sweet }) => {
  const [quantity, setQuantity] = useState(sweet?.quantity || 0);

  const handlePurchase = async () => {
    if (quantity === 0) {
      alert("Sorry, this sweet is out of stock.");
      return;
    }

    const confirmPurchase = window.confirm(
      "Do you want to purchase this sweet?"
    );
    if (confirmPurchase) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      alert("Thank you for your purchase!");
      await axios.post(
        `http://localhost:3000/api/sweets/${sweet?._id}/purchase`,
        {},
        { withCredentials: true }
      );
    }
  };

  if (!sweet) return <div>Sweet not found.</div>;

  const { name, description, category, price, image_link } = sweet;

  return (
    <div className="card">
      <img src={image_link} alt={name} />
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p className="category">Category: {category}</p>
      <p className="price">Price: ₹{price}</p>

      {quantity === 0 ? (
        <p className="outOfStock">Out of stock</p>
      ) : (
        <>
          <p className="quantity">Quantity: {quantity}</p>
          <button onClick={handlePurchase}>Purchase</button>
        </>
      )}
    </div>
  );
};

export default SweetCard;
