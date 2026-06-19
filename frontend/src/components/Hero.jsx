import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/Hero.css";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Welcome to <span className="highlight">SkillHub</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Master new skills with our comprehensive learning platform. Explore
          courses in Frontend, Backend, Database, and Cloud technologies.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
              <FiArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/add-course" className="btn btn-secondary">
              Add a Course
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Expert Courses</p>
          </div>
          <div className="stat-item">
            <h3>4.8/5</h3>
            <p>Avg. Rating</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>
    </section>
  );
};

export default Hero;
