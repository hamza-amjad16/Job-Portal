import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./components/admin/Companies.jsx"
import CreateCompany from "./components/admin/CreateCompany.jsx"
import CompanySetup from "./components/admin/CompanySetup.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"

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
        <Route path="/description/:id" element={<JobDescription />} />
        {/* Admin routes */}
        <Route path="/admin/companies" element={<Companies />}  />
        <Route path="/admin/companies/create" element={<CreateCompany />}  />
        <Route path="/admin/companies/:id" element={<CompanySetup />}  />
        <Route path="/admin/jobs" element={<AdminJobs />}  />


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
