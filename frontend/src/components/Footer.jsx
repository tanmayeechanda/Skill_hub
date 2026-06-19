import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">SkillHub</h3>
          <p className="footer-description">
            Empowering learners worldwide with quality education and skill
            development.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#courses">Courses</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-contact">
            <p className="contact-item">
              <FiMail size={18} />
              <span>contact@skillhub.com</span>
            </p>
            <p className="contact-item">
              <FiPhone size={18} />
              <span>+1 (555) 123-4567</span>
            </p>
            <p className="contact-item">
              <FiMapPin size={18} />
              <span>123 Learning St, Tech City, TC 12345</span>
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" className="social-link" title="Facebook">
              f
            </a>
            <a href="#twitter" className="social-link" title="Twitter">
              𝕏
            </a>
            <a href="#linkedin" className="social-link" title="LinkedIn">
              in
            </a>
            <a href="#instagram" className="social-link" title="Instagram">
              📷
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} SkillHub Learning Platform. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
