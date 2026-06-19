import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { getAllCourses, deleteCourse } from "../api/courseApi";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    handleSort(sortBy);
  }, [courses]);

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
    handleSort(sortBy, filtered);
  };

  const handleSort = (sortOption, coursesToSort = filteredCourses) => {
    setSortBy(sortOption);
    let sorted = [...coursesToSort];

    switch (sortOption) {
      case "recent":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popular":
        sorted.sort((a, b) => b.students - a.students);
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredCourses(sorted);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        const newCourses = courses.filter((c) => c._id !== courseId);
        setCourses(newCourses);
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
    <div className="courses-page">
      <div className="courses-page-container">
        <Sidebar />

        <main className="courses-main">
          <section className="courses-section-full">
            <div className="courses-header">
              <h1 className="courses-title">All Courses</h1>
              <p className="courses-subtitle">
                Explore {courses.length} course{courses.length !== 1 ? "s" : ""}{" "}
                from our platform
              </p>
            </div>

            <div className="courses-controls">
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search courses by title..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div className="sort-box">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
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
                className="courses-grid-full"
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

export default Courses;
