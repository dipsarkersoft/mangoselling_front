import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBarCom } from "./components/NavBarCom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./context/privetRoute";
import { Unauthorized } from "./pages/Unauthorized";
import { SellerPage } from "./pages/SellerPage";
import { useAuth } from "./context/useAuth";
import { MangoDetailsCom } from "./components/MangoDetailsCom";
import { CartPage } from "./pages/CartPage";
import { Test } from "./pages/test";
import PaymentFailed from "./pages/PaymentFailed";
import { PaymentSucess } from "./pages/PaymentSucess";
import { ContactPage } from "./pages/ContactPage";
import { Profile } from "./pages/Profile";


function App() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Toaster />
      <NavBarCom />


      <Routes>
        {isAuth? 
        <>
         <Route path="payment/sucess/:id" element={<PaymentSucess/>} />
         <Route path="payment/failed" element={<PaymentFailed/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/logout" element={<Navigate to="/login" />} />
        </>
        :
        <></>
        }


        
        <Route path="payment/sucess/:id" element={<PaymentSucess/>} />
        <Route path="payment/failed" element={<PaymentFailed/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/logout" element={<Navigate to="/login" />} />

        <Route element={<PrivateRoute requiredAccountType="Buyer" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute requiredAccountType="Seller" />}>
          <Route path="/dashboard/Seller" element={<SellerPage />} />
        </Route>



        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/mango" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="mango/:id" element={<MangoDetailsCom />} />      
        <Route path="/test" element={<Test/>} />
        <Route path="/contact" element={<ContactPage/>} />
        
        

       


       
       


      </Routes>
    </BrowserRouter>
  );
}

export default App;
