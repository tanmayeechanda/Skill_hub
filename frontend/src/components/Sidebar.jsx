import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiPlus, FiMail } from "react-icons/fi";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const categories = ["Frontend", "Backend", "Database", "Cloud"];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category} className="category-item">
              <span className="category-icon">📚</span>
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Quick Menu</h3>
        <div className="quick-menu">
          <Link to="/" className="quick-menu-item">
            <FiHome size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/add-course" className="quick-menu-item">
            <FiPlus size={18} />
            <span>Add Course</span>
          </Link>
          <Link to="/contact" className="quick-menu-item">
            <FiMail size={18} />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
