import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Navigation from 'Common/navigation';
import Dashboard from 'Dashboard/dashboard';
import Login from 'Auth/login';
import AuthProvider from 'Auth/auth_provider';
import NoMatch from 'Common/no_match';
import ProtectedRoute from 'Common/protected_route';
import Signup from 'Auth/signup';

function App() {

  return (
      <AuthProvider >
        <Navigation />
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
