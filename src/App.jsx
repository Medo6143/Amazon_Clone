import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/footer'
import { Home } from './pages/Home'
import WishlistPage from "./pages/WishlistPage"
import CartPage from './pages/CartPage'
import ProductsPage from './pages/ProductsPage'
import LoginPage from './pages/Login'
import CreateAccount from './pages/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/wishlist" element={<WishlistPage />} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateAccount/>} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
