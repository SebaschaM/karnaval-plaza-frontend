import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MenuCards from "../pages/MenuCards";
import CustomerTable from "../pages/CustomerTable";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart-menu" element={<MenuCards />} />
        <Route path="/customer-table" element={<CustomerTable />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
