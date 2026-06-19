import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const courseApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllCourses = async () => {
  try {
    const response = await courseApi.get("/courses");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Error fetching courses",
      }
    );
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await courseApi.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Error fetching course",
      }
    );
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await courseApi.post("/courses", courseData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { success: false, message: "Error adding course" }
    );
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await courseApi.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Error updating course",
      }
    );
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await courseApi.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Error deleting course",
      }
    );
  }
};

export const sendContactMessage = async (contactData) => {
  try {
    const response = await courseApi.post("/contact", contactData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Error sending message",
      }
    );
  }
};
