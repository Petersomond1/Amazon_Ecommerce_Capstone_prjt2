import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import Navbarup from "./Navbarup/Navbarup";
import AppLayout from "./AppLayout";
import Navbardown from "./Navbardown/Navbardown";
import Footer from "./Footer/Footer";
import ProductsAndServices_Display_Row_1_Carousel_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_1_Carousel_Listing";
import ProductsAndServices_Display_Row_2_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_2_Listing";
import ProductsAndServices_Display_Row_3_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_3_Listing";
import ProductsAndServices_Display_Row_4_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_4_Listing";
import ProductsAndServices_Display_Row_5_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_5_Listing";
import ProductsAndServices_Display_Row_6_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_6_Listing";
import PrivateRoute from "./PrivateRoute";
import ProductsAndServices_Display_Connect from "./ProductsAndServices/ProductsAndServices_Display_Connect";
import AllProductsAndServices_Display from "./ProductsAndServices/AllProductsAndServices_Display";
import Cart from "./ProductsAndServices/Cart";
import { CartProvider } from "./ProductsAndServices/CartContext.jsx";
import CheckoutToShipping from "./ProductsAndServices/CheckoutToShipping";
import Payment from "./ProductsAndServices/Payment.jsx";
import AdminDashboard from "./ProductsAndServices/AdminDashboard";
import ProductsAndServices_SingleDisplay from "./ProductsAndServices/ProductsAndServices_SingleDisplay";
import ProductsAndServices_CategoryDisplay from "./ProductsAndServices/ProductsAndServices_CategoryDisplay";


const queryClient = new QueryClient();

function App() {
  // const isAdmin = checkIfUserIsAdmin();
  const isAdmin = true;

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbarup />
          <Navbardown />
          <Routes>
            <Route element={<AppLayout />}></Route>
            <Route
              path="/"
              element={<ProductsAndServices_Display_Connect />}
            ></Route>
            <Route
              path="/allproducts"
              element={<AllProductsAndServices_Display />}
            ></Route>
            <Route
              path="/admindashboard"
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  {" "}
                  <AdminDashboard />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/ProductsAndServices_Display_Row_1_Carousel_Listing"
              element={<ProductsAndServices_Display_Row_1_Carousel_Listing  />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_2_Listing/:category"
              element={<ProductsAndServices_Display_Row_2_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_3_Listing"
              element={<ProductsAndServices_Display_Row_3_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_4_Listing"
              element={<ProductsAndServices_Display_Row_4_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_5_Listing"
              element={<ProductsAndServices_Display_Row_5_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_6_Listing"
              element={
                <ProductsAndServices_Display_Row_6_Listing />
              }
            ></Route>
            <Route path="/ProductsAndServices_SingleDisplay/:id" element={<ProductsAndServices_SingleDisplay/>}></Route>
            <Route path="/ProductsAndServices_CategoryDisplay/:category" element={<ProductsAndServices_CategoryDisplay/>}></Route>
           
            <Route path="/api/cart" element={<Cart />}></Route>
            <Route
              path="/api/checkouttoshipping"
              element={<CheckoutToShipping />}
            ></Route>
            <Route path="/api/payment" element={<Payment />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
