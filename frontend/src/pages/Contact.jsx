import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { sendContactMessage } from "../api/courseApi";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      const response = await sendContactMessage(formData);

      if (response.success) {
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <Sidebar />

        <main className="contact-main">
          <motion.section
            className="contact-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="contact-header" variants={itemVariants}>
              <h1 className="contact-title">Get In Touch</h1>
              <p className="contact-subtitle">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </motion.div>

            <div className="contact-content">
              <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                variants={itemVariants}
              >
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-textarea ${errors.message ? "error" : ""}`}
                    placeholder="Enter your message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                  ></textarea>
                  {errors.message && (
                    <span className="error-text">{errors.message}</span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>

              <motion.div className="contact-info" variants={itemVariants}>
                <div className="info-card">
                  <h3 className="info-title">📧 Email</h3>
                  <p className="info-text">contact@skillhub.com</p>
                </div>

                <div className="info-card">
                  <h3 className="info-title">📞 Phone</h3>
                  <p className="info-text">+1 (555) 123-4567</p>
                </div>

                <div className="info-card">
                  <h3 className="info-title">📍 Address</h3>
                  <p className="info-text">
                    123 Learning St, Tech City, TC 12345
                  </p>
                </div>

                <div className="info-card">
                  <h3 className="info-title">⏰ Hours</h3>
                  <p className="info-text">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
