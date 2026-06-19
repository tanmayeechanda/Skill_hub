import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiEye } from "react-icons/fi";
import "../styles/CourseCard.css";

const CourseCard = ({ course, onViewCourse, onDelete, onEdit }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="course-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="course-card-header">
        <h3 className="course-title">{course.title}</h3>
      </div>

      <div className="course-card-body">
        <div className="course-stat">
          <FiUsers size={20} className="stat-icon" />
          <span>{course.students} students enrolled</span>
        </div>
      </div>

      <div className="course-card-footer">
        <motion.button
          className="btn-view"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onViewCourse(course)}
        >
          <FiEye size={16} />
          View
        </motion.button>

        {onEdit && (
          <motion.button
            className="btn-edit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onEdit(course)}
          >
            Edit
          </motion.button>
        )}

        {onDelete && (
          <motion.button
            className="btn-delete"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onDelete(course._id)}
          >
            Delete
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
