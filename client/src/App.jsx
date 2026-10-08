import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// export const serverUrl = "https://genweb-ai-rl4y.onrender.com";
export const serverUrl = "http://localhost:8000";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import WebsiteEditor from "./pages/WebsiteEditor";

function App() {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route
          path="/editor/:id"
          element={userData ? <WebsiteEditor /> : <Home />}
        />
      </Routes>
    </Router>
  );
}

export default App;
