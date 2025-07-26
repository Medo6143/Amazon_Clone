
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/footer'
import { Home } from './pages/Home'
import CartPage from './pages/CartPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
