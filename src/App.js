import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Breadcrumb from './pages/Breadcrumb/Breadcrumb';

const HomePage = lazy(() => import("./pages/Home/Home"));
const CertPage = lazy(() => import("./pages/Cert/Cert"));
const PracticePage = lazy(() => import("./pages/PracticePage/Practice"));
const TestPage = lazy(() => import("./pages/TestPage/Test"));

function App() {
  const [buttonOnTop, setButtonOnTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
        setButtonOnTop(window.scrollY >= 200 ? !buttonOnTop : buttonOnTop)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

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
        <button
          className="gototop"
          onClick={handleToTop}
          style={{
            visibility: buttonOnTop ? "visible" : "hidden"
          }}
        >
          <i className="fa fa-angle-up"></i>
        </button>
      </React.Fragment>
    </Router>
  );
}

export default App;
