import React from 'react';
import './App.css';
import FullWidthTabs from './components/common/Nav';
import ErrorPage from './components/pages/ErrorPage';
import { Route, Router, Routes } from 'react-router-dom';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/*" element={<FullWidthTabs />} />
          <Route path="/estimations/error" element={<ErrorPage />} />
          {/* Catch-all route for any undefined paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
  );
}

export default App;
