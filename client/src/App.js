import Login from "./pages/common/Login/Login";
import Register from "./pages/common/Register/Register";

import "./styleSheets/alignments.css";
import "./styleSheets/textElements.css";
import "./styleSheets/theme.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/protectRoute";
import Home from "./pages/common/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
        <ProtectRoute>
          <Home />
        </ProtectRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
