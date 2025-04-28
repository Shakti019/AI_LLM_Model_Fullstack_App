import { useState } from "react";
import { FaList, FaTh, FaChartLine, FaSearch } from "react-icons/fa";
import "./TradingList.css";

const ViewSwitcher = () => {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for trending raw materials
  const trendingMaterials = [
    { 
      id: 1, 
      name: "Copper", 
      price: "$8,500/ton", 
      category: "Metals",
      trend: "up",
      change: "2.5%",
      origin: "Chile",
      supplier: "Global Metals Inc."
    },
    { 
      id: 2, 
      name: "Wheat", 
      price: "$320/ton", 
      category: "Agriculture",
      trend: "down",
      change: "1.2%",
      origin: "USA",
      supplier: "AgriCorp"
    },
    { 
      id: 3, 
      name: "Crude Oil", 
      price: "$85/barrel", 
      category: "Energy",
      trend: "up",
      change: "3.8%",
      origin: "Saudi Arabia",
      supplier: "PetroGlobal"
    },
    { 
      id: 4, 
      name: "Cotton", 
      price: "$1.20/lb", 
      category: "Textiles",
      trend: "neutral",
      change: "0%",
      origin: "India",
      supplier: "Textile World"
    },
    { 
      id: 5, 
      name: "Aluminum", 
      price: "$2,400/ton", 
      category: "Metals",
      trend: "up",
      change: "1.7%",
      origin: "Canada",
      supplier: "North Metals"
    },
  ];

  // Filter materials based on search term
  const filteredMaterials = trendingMaterials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="trading-container">
      <div className="view-header">
        <h2>Trending Raw Materials</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="view-switcher">
          <button 
            className={`switch-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <FaList className="icon" />
            List
          </button>
          <button 
            className={`switch-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => setView("grid")}
          >
            <FaTh className="icon" />
            Grid
          </button>
        </div>
      </div>

      <div className="content">
        {view === "list" ? (
          <div className="list-view">
            <div className="list-header">
              <span className="header-item">Material</span>
              <span className="header-item">Price</span>
              <span className="header-item">Trend</span>
              <span className="header-item">Category</span>
              <span className="header-item">Origin</span>
            </div>
            {filteredMaterials.map((material) => (
              <div key={material.id} className="list-item">
                <span className="material-name">
                  <strong>{material.name}</strong>
                  <small>{material.supplier}</small>
                </span>
                <span className="material-price">{material.price}</span>
                <span className={`material-trend ${material.trend}`}>
                  <FaChartLine className="trend-icon" />
                  {material.change}
                </span>
                <span className="material-category">{material.category}</span>
                <span className="material-origin">{material.origin}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid-view">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="grid-item">
                <div className="grid-item-header">
                  <h3>{material.name}</h3>
                  <span className={`price-tag ${material.trend}`}>
                    {material.price}
                  </span>
                </div>
                <div className="grid-item-details">
                  <p><strong>Category:</strong> {material.category}</p>
                  <p><strong>Origin:</strong> {material.origin}</p>
                  <p><strong>Supplier:</strong> {material.supplier}</p>
                </div>
                <div className={`trend-indicator ${material.trend}`}>
                  <FaChartLine className="trend-icon" />
                  <span>{material.change}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSwitcher;