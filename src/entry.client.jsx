import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Home from "@/app/page.jsx";
import About from "@/app/about/page.jsx";
import Catalog from "@/app/catalog/page.jsx";
import Products from "@/app/products/page.jsx";
import ProductDetail from "@/app/products/[id]/page.jsx";
import Cart from "@/app/cart/page.jsx";
import Checkout from "@/app/checkout/page.jsx";
import Contact from "@/app/contact/page.jsx";
import Success from "@/app/success/[orderCode]/page.jsx";
import DepoPanel from "@/app/depo-panel/page.jsx";

const rawBase = import.meta.env.BASE_URL || "/";
const basename =
  rawBase === "/./"
    ? "/"
    : rawBase.endsWith("/") && rawBase !== "/"
    ? rawBase.slice(0, -1)
    : rawBase;

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/catalog", element: <Catalog /> },
    { path: "/products", element: <Products /> },
    { path: "/products/:id", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/contact", element: <Contact /> },
    { path: "/success/:orderCode", element: <Success /> },
    { path: "/depo-panel", element: <DepoPanel /> },
  ],
  { basename }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
