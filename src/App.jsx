import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/Mainlayout'
import { Home } from './pages/Home'
import WishlistPage from "./pages/WishlistPage"
import CartPage from './pages/CartPage'
import ProductsPage from './pages/ProductsPage'

import ProductDetails from './pages/ProductDetails'

import LoginPage from './pages/Login'
import CreateAccount from './pages/Register'
import ProtuctedRoute from './routes/ProtectedRoute'
import ProfilePage from './pages/Profile'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public routes WITHOUT layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CreateAccount />} />

        {/* Routes WITH layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtuctedRoute>
              <MainLayout>
                <CartPage />
              </MainLayout>
            </ProtuctedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtuctedRoute>
              <MainLayout>
                <WishlistPage />
              </MainLayout>
            </ProtuctedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtuctedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtuctedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
