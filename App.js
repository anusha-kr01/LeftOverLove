import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Donor from "./pages/Donor";
import Receiver from "./pages/Receiver";
import Volunteer from "./pages/Volunteer";
import Organization from "./pages/Organization";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/App.css";

// PrivateRoute protects authenticated routes
function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

// SidebarWrapper determines when to show the Sidebar
function SidebarWrapper({ children }) {
  const location = useLocation();
  // Add any paths here where you don't want the sidebar
  const hideSidebar = ["/login", "/signup"].includes(location.pathname);
  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <div className="content" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/donor" element={<PrivateRoute><Donor /></PrivateRoute>} />
          <Route path="/receiver" element={<PrivateRoute><Receiver /></PrivateRoute>} />
          <Route path="/volunteer" element={<PrivateRoute><Volunteer /></PrivateRoute>} />
          <Route path="/organization" element={<PrivateRoute><Organization /></PrivateRoute>} />
          <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </SidebarWrapper>
    </Router>
  );
}

export default App;