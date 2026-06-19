import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { getAllCourses, deleteCourse } from "../api/courseApi";
import "../styles/Home.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCourses();
      if (response.success) {
        setCourses(response.data);
        setFilteredCourses(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch courses");
      toast.error(err.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value),
    );
    setFilteredCourses(filtered);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses(courses.filter((c) => c._id !== courseId));
        setFilteredCourses(filteredCourses.filter((c) => c._id !== courseId));
        toast.success("Course deleted successfully");
      } catch (err) {
        toast.error(err.message || "Failed to delete course");
      }
    }
  };

  const handleViewCourse = (course) => {
    toast.info(`Viewing course: ${course.title}`);
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

  return (
    <div className="home-page">
      <Hero />

      <div className="home-container">
        <Sidebar />

        <main className="home-main">
          <section className="courses-section">
            <div className="section-header">
              <h2 className="section-title">Featured Courses</h2>
              <p className="section-subtitle">
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {loading ? (
              <motion.div
                className="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="spinner"></div>
                <p>Loading courses...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="error-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="error-message">❌ {error}</p>
                <button className="btn btn-primary" onClick={fetchCourses}>
                  Retry
                </button>
              </motion.div>
            ) : filteredCourses.length === 0 ? (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="empty-message">
                  {searchTerm
                    ? "No courses match your search"
                    : "No courses available yet"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="courses-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onViewCourse={handleViewCourse}
                    onDelete={handleDeleteCourse}
                  />
                ))}
              </motion.div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
