import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup'
// Adding Routes of My Web-APP with create-router-dom package
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// importing my  NoteState for using it as a ContextApi
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />



          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
