import { useAuth } from "../../Auth/AuthContext";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <Navbar />

      <div className="hero-section-1">
        <h2 style={{ color: "white" }}>
          Welcome to <span>Candy Shop</span>
        </h2>
        <p>Discover the finest collection of handcrafted sweets and desserts</p>
        <button
          onClick={() => {
            navigate("/menu");
          }}
        >
          Browse Sweets
        </button>
      </div>

      <div className="hero-section-2">
        <h2>Welcome back, {user ? user.name : ""}! 🍰</h2>
        <p>What delicious treats are you craving today?</p>
      </div>

      <div className="poster">
        <h2 style={{ color: "white" }}>Ready to Indulge?</h2>
        <p>
          Join thousands of satisfied customers who trust SweetShop for their
          dessert needs
        </p>
        <button
          onClick={() => {
            navigate("/menu");
          }}
        >
          View Full Menu
        </button>
      </div>

      <div className="hero-section-3">
        <h2>Why Choose Us?</h2>
        <div className="hero-card-container">
          <div className="hero-card">
            <i class="fa-solid fa-star"></i>
            <h3>Premium Quality</h3>
            <p>
              Made with the finest ingredients and traditional recipes passed
              down through generations
            </p>
          </div>
          <div className="hero-card">
            <i class="fa-solid fa-truck"></i>
            <h3>Fresh Daily</h3>
            <p>
              All our sweets are freshly made daily to ensure the perfect taste
              and quality
            </p>
          </div>
          <div className="hero-card">
            <i class="fa-solid fa-handshake"></i>
            <h3>Expert Service</h3>
            <p>
              Our passionate team is dedicated to providing exceptional customer
              service
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
