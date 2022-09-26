import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen.js';
import ThreatScreen from './screens/ThreatScreen';
import './App.css';
import PreviousThreatScreen from './screens/PreviousThreatScreen';
import ApprovedThreatScreen from './screens/ApprovedThreatScreen'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginScreen from './screens/LoginScreen';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/threat/:id" element={<ThreatScreen />} />
        <Route path="/approved" element={<PreviousThreatScreen />} />
        <Route path="approvedthreat/:id" element={<ApprovedThreatScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
