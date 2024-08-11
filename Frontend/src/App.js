import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Books from './pages/Books.jsx';
import Bookscategory from './pages/Bookscategory.jsx';
import Shop from './pages/Shop.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/fictions' element={<Bookscategory category="fiction"/>}/>
        <Route path='/Non-fiction' element={<Bookscategory category="non-fiction"/>}/>
        <Route path='/others' element={<Bookscategory category="others"/>}/>
        <Route path='/Books' element={<Books/>}/>
          <Route path=':productId' element={ <Books/>}/>
        <Route path='/cart' element={<cart/>}/>
        <Route path='/login' element={<loginSignup/>}/>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
