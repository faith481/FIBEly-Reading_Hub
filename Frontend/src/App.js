import './App.css';
import Navbar from './components/Navbar/Navbar.jsx'
import { BrowsRouter, Routes, Route } from 'react-router-dom'
import Books from './pages/Books.jsx';

function App() {
  return (
    <div>
      <BrowsRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<shop/>}/>
        <Route path='/fictions' element={<Bookscategory category="fiction"/>}/>
        <Route path='/Non-fiction' element={<Bookscategory category="non-fiction"/>}/>
        <Route path='/others' element={<Bookscategory category="others"/>}/>
        <Route path='/Books' element={<Books/>}/>
          <Route path=':productId' element={ <Books/>}/>
        <Route path='/cart' element={<cart/>}/>
        <Route path='/login' element={<loginSignup/>}/>
      </Routes>

      </BrowsRouter>
    </div>
  );
}

export default App;
