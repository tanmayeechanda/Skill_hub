const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found",
        count: 0,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { title, students } = req.body;

    if (!title || students === undefined || students === null) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (title, students)",
      });
    }

    if (typeof students !== "number" || students < 0) {
      return res.status(400).json({
        success: false,
        message: "Students must be a non-negative number",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Course title must be at least 3 characters long",
      });
    }

    const newCourse = new Course({
      title: title.trim(),
      students: parseInt(students),
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: savedCourse,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: "Validation error: " + messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding course",
      error: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, students } = req.body;

    if (!title && students === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    if (
      students !== undefined &&
      (typeof students !== "number" || students < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Students must be a non-negative number",
      });
    }

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (students !== undefined) updateData.students = parseInt(students);

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};
