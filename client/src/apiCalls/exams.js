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

export const getExamById = async (examId) => {
  try {
    const response = await axiosInstance.get(`/api/exams/get-exam-by-id/${examId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateExamById = async ( examId, payload ) => {
  try {
    const response = await axiosInstance.put(`/api/exams/edit-exam-by-id/${examId}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const removeExamById = async (examId) => {
  try {
    const response = await axiosInstance.delete(`/api/exams/delete-exam-by-id/${examId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};