import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import("./pages/Home/Home"));
const CertPage = lazy(() => import("./pages/Cert/Cert"));
const PracticePage = lazy(() => import("./pages/Practice/Practice"));

function App() {
  return (
    <Router>
      <React.Fragment>
        <Suspense fallback={<div style={{textAlign: "center"}}>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/:exam" element={<CertPage/>} />
            <Route path="/practice/:exam/:certificate" element={<PracticePage/>} />
          </Routes>
        </Suspense>
      </React.Fragment>
    </Router>
  );
}

export default App;
