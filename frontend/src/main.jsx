import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PatientDashboard from './components/patient/Dashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>
);
