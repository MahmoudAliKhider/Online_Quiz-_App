import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styleSheets/alignments.css";
import "./styleSheets/textElements.css";
import "./styleSheets/theme.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";
import "./styleSheets/layout.css";

import ProtectRoute from "./components/protectRoute";

import Login from "./pages/common/Login/Login";
import Register from "./pages/common/Register/Register";
import Home from "./pages/common/Home/Home";

import Exams from "./pages/admin/Exams/exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import WriteExam from "./pages/user/WriteExam";


function App() {
  const { loading } = useSelector(state => state.loader);

  return (
    <>
      {loading && <Loader />}

      <BrowserRouter>
        <Routes>
          {/* common Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user Route */}
          <Route path="/" element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>}
          />

          <Route path="/user/write-exam/:id" element={
            <ProtectRoute>
              <WriteExam />
            </ProtectRoute>}
          />

          {/* admin route */}
          <Route path="/admin/exams" element={
            <ProtectRoute>
              <Exams />
            </ProtectRoute>}
          />

          <Route path="/admin/exams/add" element={
            <ProtectRoute>
              <AddEditExam />
            </ProtectRoute>}
          />

          <Route path="/admin/exams/edit/:id" element={
            <ProtectRoute>
              <AddEditExam />
            </ProtectRoute>}
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
