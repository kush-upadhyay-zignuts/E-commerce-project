import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";

import "./assets/views/App.css";
import ProductDetails from "./pages/product-details/ProductDetails";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ChangePassword from "./pages/change-password/ChangePassword";
import EditProfile from "./pages/edit-profile/EditProfile";
import Cart from "./pages/cart/Cart";
import UserHome from "./pages/user-home/UserHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
