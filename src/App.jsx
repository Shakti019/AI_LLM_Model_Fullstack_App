import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import Loginpage from "./Login";
import Dashboard from "./Dashboard";
import Register from "./AccountCreation";
import Charts from './components/Charts';
import EnhancedProfile from './components/EnhancedProfile';
import AIChatPage from './AIChatPage';
import Message from './components/Message';
import Notificate from './components/Notificate';

function App() {

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Register" element={<Register />} /> {/* Changed from /Register */}
        
        
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/profile" element={<EnhancedProfile />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/notifications" element={<Notificate />} />
        </Route>

        {/* Catch-All Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
