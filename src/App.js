import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Breadcrumb from './pages/Breadcrumb/Breadcrumb';

const HomePage = lazy(() => import("./pages/Home/Home"));
const CertPage = lazy(() => import("./pages/Cert/Cert"));
const PracticePage = lazy(() => import("./pages/PracticePage/Practice"));
const TestPage = lazy(() => import("./pages/TestPage/Test"));

function App() {
  return (
    <Router>
      <React.Fragment>
        <Breadcrumb/>
        <Suspense fallback={<div style={{textAlign: "center"}}>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/:exam" element={<CertPage/>} />
            <Route path="/practice/:exam/:certificate" element={<PracticePage/>} />
            <Route path="/test/:exam/:certificate" element={<TestPage/>} />
          </Routes>
        </Suspense>
      </React.Fragment>
    </Router>
  );
}

export default App;
