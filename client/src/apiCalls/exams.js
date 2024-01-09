import axiosInstance from ".";

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await axiosInstance.get("/api/exams/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/exams/get-exam-by-id", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};