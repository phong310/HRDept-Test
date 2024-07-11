import { Toaster } from "@/components/ui/toaster"
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import MainLayout from './Layout/MainLayout'
import Login from './pages/Login'
import PrivateRoute from "./Private/PrivateRoute"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<PrivateRoute element={MainLayout} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
