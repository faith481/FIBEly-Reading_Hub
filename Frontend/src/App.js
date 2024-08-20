import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Signup from "./pages/loginSignup.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Books from "./pages/Books.jsx";
import Bookscategory from "./pages/Bookscategory.jsx";
import Shop from "./pages/shop.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";
  const isLoginSignup =
    location.pathname === "/signup" || location.pathname === "/login";
  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {!isLandingPage && !isLoginSignup && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Shop />} />
        <Route path="/fiction" element={<Bookscategory category="fiction" />} />
        <Route
          path="/Non-fiction"
          element={<Bookscategory category="non-fiction" />}
        />
        <Route
          path="/others"
          element={<Bookscategory category="spirituality" />}
        />
        <Route path="/Books" element={<Books />} />
        <Route path=":productId" element={<Books />} />
        <Route path="/cart" element={<cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!isLandingPage && !isLoginSignup && <Footer />}
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
