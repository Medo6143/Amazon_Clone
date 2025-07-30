import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './layout/Mainlayout'; // Eagerly imported
import ProtectedRoute from './routes/ProtectedRoute'; // Eagerly imported or lazy as needed

const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/PagesNotFound'));
const CategoryPage = lazy(() => import('./pages/CatgoryPage'));

import { Home } from "./pages/Home";  // Eagerly imported
import LoginPage from "./pages/Login";  // Eagerly imported
import CreateAccount from "./pages/Register";  // Eagerly imported

function App() {
  return (
    <BrowserRouter>
      {/* MainLayout is outside Suspense so navbar/footer always load immediately */}
      <MainLayout>
        <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-primary" role="status" aria-label="Loading">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<CreateAccount />} />

            <Route path="/" element={<Home />} />
            <Route path="/products/:searchParam?" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
