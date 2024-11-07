import Home from "./pages/Home/Home"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('logged in');
        navigate('/');
      } else {
        console.log('logged out')
        navigate('/login')
      }
    })
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="player/:id" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;