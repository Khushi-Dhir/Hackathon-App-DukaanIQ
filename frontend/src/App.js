import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
 import ProductForm from "./components/ProductForm";
 import ShopForm from "./components/ShopForm";
 import BatchForm from "./components/BatchForm";
import Inventory from "./components/Inventory";
import ShowShop from "./components/ShowShop";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProductBatch from "./components/ProductBatch.jsx";
import ExpiryAlerts from "./components/ExpiryAlert.jsx";


function Router() {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/showshop" element={<ShowShop />} />
        <Route path="/ExpiryAlert" element={<ExpiryAlerts/>} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductForm />} />
        <Route path="/product-batch" element={<ProductBatch />} />
        <Route path="/batch" element={<BatchForm />} />
        <Route path="/shop" element={<ShopForm />} />
         <Route path="/login" element={<Login />} />
         <Route path="/Signup" element={<Signup />} />
      </Routes>


    </BrowserRouter>
  );
}
//<Route path='/admin' element={<Admin/>}/>
// <Route path="/login" element={<Login />} />
   //     <Route path="/signup" element={<Signup />} />
export default Router;
