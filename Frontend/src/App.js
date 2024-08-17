import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Signup from "./pages/loginSignup.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books.jsx";
import Bookscategory from "./pages/Bookscategory.jsx";
import Shop from "./pages/shop.jsx";
import Footer from "./components/Footer/Footer.jsx";
import fiction_banner from "./components/assets/Assets/Frontend_Assets/banner_fiction.png";
import nonfiction_banner from "./components/assets/Assets/Frontend_Assets/banner_non-fiction.png";
import others_banner from "./components/assets/Assets/Frontend_Assets/banner_others.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/fiction"
            element={
              <Bookscategory banner={fiction_banner} category="fiction" />
            }
          />
          <Route
            path="/Non-fiction"
            element={
              <Bookscategory
                banner={nonfiction_banner}
                category="non-fiction"
              />
            }
          />
          <Route
            path="/others"
            element={<Bookscategory banner={others_banner} category="others" />}
          />
          <Route path="/Books" element={<Books />} />
          <Route path=":productId" element={<Books />} />
          <Route path="/cart" element={<cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
