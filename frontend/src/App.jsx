import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
