import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home/Home'
import "./assets/styles/App.css"
import ProductDetails from "./pages/product-details/ProductDetails";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login";
import ChangePassword from "./pages/change-password/ChangePassword";
import EditProfile from "./pages/edit-profile/EditProfile";
import Cart from "./pages/cart/Cart";
import UserHome from "./pages/user-home/UserHome";


function App() {

 
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<UserHome />}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editprofile" element={<EditProfile   />} />
        <Route path="/cart" element={<Cart   />} />
      </Routes>
    </BrowserRouter>
      {/* <div>
        
        <Home/>
        

      </div> */}
     
    </>
  )
}

export default App
