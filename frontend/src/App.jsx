import './tailwind.css'
import Landingpage from './pages/mainpage'
import { Routes, Route } from "react-router-dom";


import Login from "./pages/login";
import Signup from "./pages/signup";
import Index from './index';
import Show from "./pages/show";
import NewListingForm from './pages/newlisting';
import EditForm from './pages/editform'
import Header from "./components/header";
import Footer from "./components/footer";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/listings" element={<Index />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/listings/new" element={<NewListingForm />} />
        <Route path="/listings/:id/edit" element={<EditForm />} />
        </Route>
        
        <Route path="/listings/:id" element={<Show />} />
        
      </Routes>
      <Footer />
    </>
  );
}

