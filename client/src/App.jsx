import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export const serverUrl = "http://localhost:8000";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";

function App() {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path="/" elem ent={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
      </Routes>
    </Router>
  );
}

export default App;
