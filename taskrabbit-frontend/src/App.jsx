import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Taskers from "./pages/Taskers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Coupons from "./pages/Coupons";
import Banners from "./pages/Banners";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard /></ProtectedRoute>} />

      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />

      <Route path="/taskers" element={<ProtectedRoute><Taskers /></ProtectedRoute>} />

      <Route path="/bookings" element={ <ProtectedRoute><Bookings /></ProtectedRoute>} />

      <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />

      <Route path="/coupons" element={<ProtectedRoute><Coupons /></ProtectedRoute>} />

      <Route path="/banners" element={<ProtectedRoute><Banners /></ProtectedRoute>} />

    </Routes>

  );

}

export default App;