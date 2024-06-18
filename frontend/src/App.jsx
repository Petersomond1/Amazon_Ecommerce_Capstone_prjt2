import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import Navbarup from "./Navbarup/Navbarup";
import AppLayout from "./AppLayout";
import Navbardown from "./Navbardown/Navbardown";
import Footer from "./Footer/Footer";
import ProductsAndServices_Display_Row_1_Carousel_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_1_Carousel_Listing";
import ProductsAndServices_Display_Row_2_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_2_Listing";
import ProductsAndServices_Display_Row_3_Slider from "./ProductsAndServices/ProductsAndServices_Display_Row_3_Slider";
import ProductsAndServices_Display_Row_4_Slider from "./ProductsAndServices/ProductsAndServices_Display_Row_4_Slider";
import ProductsAndServices_Display_Row_5 from "./ProductsAndServices/ProductsAndServices_Display_Row_5";
import ProductsAndServices_Display_Row_6_Livestream_n_Slider from "./ProductsAndServices/ProductsAndServices_Display_Row_6_Livestream_n_Slider";
import AdminDashboard from "./ProductsAndServices/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import ProductsAndServices_Display_Connect from "./ProductsAndServices/ProductsAndServices_Display_Connect";
import AllProductsAndServices_Display from "./ProductsAndServices/AllProductsAndServices_Display";
import Cart from "./ProductsAndServices/Cart";
import { CartProvider } from "./ProductsAndServices/CartContext.jsx";
import CheckoutToShipping from "./ProductsAndServices/CheckoutToShipping";
import Payment from "./ProductsAndServices/Payment.jsx";

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
              element={<ProductsAndServices_Display_Row_1_Carousel_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_2_Listing/:category"
              element={<ProductsAndServices_Display_Row_2_Listing />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_3_Slider"
              element={<ProductsAndServices_Display_Row_3_Slider />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_4_Slider"
              element={<ProductsAndServices_Display_Row_4_Slider />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_5"
              element={<ProductsAndServices_Display_Row_5 />}
            ></Route>
            <Route
              path="/ProductsAndServices_Display_Row_6_Livestream_n_Slider"
              element={
                <ProductsAndServices_Display_Row_6_Livestream_n_Slider />
              }
            ></Route>
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
