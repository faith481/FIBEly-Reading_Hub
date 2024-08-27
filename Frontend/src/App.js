import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Signup from "./pages/loginSignup.jsx";
import Login from "./pages/login.jsx";
import Bookscategory from "./pages/Bookscategory.jsx";
import Shop from "./pages/shop.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Welcome from "./pages/welcome";
import Logout from "./pages/logout.jsx";
import ManageBooks from "./pages/books.jsx";
import Cart from "./pages/cart.jsx";
import BookDetail from "./pages/backendImage.jsx";
import DescribeBook from "./pages/describeBook.jsx";
import PaymentPage from "./pages/paymentPage";
//import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";
  const isHidden =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/logout";

  return (
    <div>
      {!isLandingPage && !isHidden && <Navbar />}
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome/:username" element={<Welcome />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/books" element={<ManageBooks />} />
        <Route path="/search" element={<BookDetail />} />
        <Route path="/describe/:id" element={<DescribeBook />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      {!isLandingPage && !isHidden && <Footer />}
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
