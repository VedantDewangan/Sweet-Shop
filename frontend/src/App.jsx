import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PublicRoute from "./Auth/PublicRoute";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Menu from "./pages/Menu/Menu";
import AddSweet from "./Admin/AddSweet/AddSweet";
import AdminHome from "./Admin/AdminHome/AdminHome";
import AdminUpdateFood from "./Admin/AdminUpdateFood/AdminUpdateFood";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-page"
          element={
            <ProtectedRoute>
              <AddSweet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-food/:id"
          element={
            <ProtectedRoute>
              <AdminUpdateFood />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
