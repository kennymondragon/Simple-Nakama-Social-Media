import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./pages/Nav";
import Footer from "./pages/Footer";
import { AuthProvider } from "./context/AuthProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Loading from "./pages/Loading";
import PersistantLogin from "./components/PersistantLogin";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ChatOverlay from "./components/ChatOverlay";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="wholeApp">
          <div className="topApp">
            <Router>
              <NavBar />
                <ChatOverlay />
              <div className="innerApp">
                <Routes>
                  <Route element={<PersistantLogin />}>
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/loading" element={<Loading />} />
                    {/* Prtected Routes */}
                    <Route element={<RequireAuth />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
            </Router>
          </div>
          <Footer />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
