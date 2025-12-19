import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import About from './pages/about/About';
import Explore from './pages/explore/Explore';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import History from './pages/history/History';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App