import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Navigation from 'common/navigation';
import Dashboard from 'dashboard/dashboard';
import Login from 'auth/login';
import AuthProvider from 'auth/auth_provider';
import NoMatch from 'common/no_match';
import ProtectedRoute from 'common/protected_route';
import Signup from 'auth/signup';

function App() {

  return (
    <div>
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
    </div>
  );
}

export default App;
