import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { addCourse } from "../api/courseApi";
import "../styles/AddCourse.css";

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    students: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Course title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Course title cannot exceed 100 characters";
    }

    if (formData.students === "") {
      newErrors.students = "Number of students is required";
    } else if (isNaN(formData.students) || formData.students < 0) {
      newErrors.students = "Please enter a valid non-negative number";
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
      const courseData = {
        title: formData.title.trim(),
        students: parseInt(formData.students),
      };

      const response = await addCourse(courseData);

      if (response.success) {
        toast.success(response.message);
        setFormData({
          title: "",
          students: "",
        });
        setTimeout(() => {
          navigate("/courses");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add course");
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
    <div className="add-course-page">
      <div className="add-course-container">
        <Sidebar />

        <main className="add-course-main">
          <motion.section
            className="add-course-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="add-course-header" variants={itemVariants}>
              <h1 className="add-course-title">Add a New Course</h1>
              <p className="add-course-subtitle">
                Share your expertise with the community
              </p>
            </motion.div>

            <motion.form
              className="add-course-form"
              onSubmit={handleSubmit}
              variants={itemVariants}
            >
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Course Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-input ${errors.title ? "error" : ""}`}
                  placeholder="e.g., Advanced React Hooks"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                {errors.title && (
                  <span className="error-text">{errors.title}</span>
                )}
                <span className="char-count">
                  {formData.title.length}/100 characters
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="students" className="form-label">
                  Number of Students *
                </label>
                <input
                  type="number"
                  id="students"
                  name="students"
                  className={`form-input ${errors.students ? "error" : ""}`}
                  placeholder="e.g., 250"
                  value={formData.students}
                  onChange={handleInputChange}
                  disabled={loading}
                  min="0"
                />
                {errors.students && (
                  <span className="error-text">{errors.students}</span>
                )}
              </div>

              <div className="form-actions">
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Adding Course..." : "Add Course"}
                </motion.button>

                <motion.button
                  type="button"
                  className="btn btn-secondary"
                  disabled={loading}
                  onClick={() => navigate("/courses")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>

            <motion.div className="form-tips" variants={itemVariants}>
              <h3>Tips for Adding a Course</h3>
              <ul>
                <li>Use clear and descriptive course titles</li>
                <li>Ensure the student count is accurate</li>
                <li>Focus on popular and in-demand topics</li>
                <li>Keep course titles between 3-100 characters</li>
              </ul>
            </motion.div>
          </motion.section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AddCourse;
