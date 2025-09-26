import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";
import axios from "axios";
import SweetCard from "../../components/SweetCard/SweetCard";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/sweets`, {
        withCredentials: true,
      });
      setMenu(data.all_sweet);
    } catch (error) {
      console.error("Failed to fetch sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMenu = async () => {
    if (searchTerm.trim() === "") {
      fetchMenu();
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/sweets/${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setMenu(data);
    } catch (error) {
      console.error("Failed to fetch sweets:", error);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMenu();
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search sweets by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={searchMenu}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading sweets...</p>
      ) : (
        <div className="all-card">
          {menu.length > 0 ? (
            menu.map((obj, i) => <SweetCard key={i} sweet={obj} />)
          ) : (
            <p className="no-results">No sweets found.</p>
          )}
        </div>
      )}
    </div>
  );
}
