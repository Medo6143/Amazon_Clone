// src/components/CartPage/CartPage.jsx
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CartItem from '../components/ui/CartItem';
import '../styles/CartPage.css';

// temporary mock data
const initialCart = [
  {
    id: 1,
    title: 'Echo Dot (5th Gen)',
    price: 49.99,
    qty: 2,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Fire TV Stick 4K',
    price: 39.99,
    qty: 1,
    image: 'https://via.placeholder.com/150',
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  // helpers
  const updateQty = (id, qty) =>
    setCart(c =>
      c.map(item => (item.id === id ? { ...item, qty } : item))
    );

  const removeItem = id => setCart(c => c.filter(item => item.id !== id));

  const saveForLater = id => {
    // stub; implement later
    alert(`Saved item ${id} for later`);
  };

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const items    = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <Container className="cart-page my-4">
      <Row>
        {/* LEFT — items list */}
        <Col lg={8}>
          <h4 className="cart-title">Shopping Cart</h4>
          <p className="text-end d-lg-none">
            Subtotal ({items} items): <span className="fw-bold">${subtotal.toFixed(2)}</span>
          </p>
          <hr />
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQtyChange={updateQty}
              onRemove={removeItem}
              onSaveLater={saveForLater}
            />
          ))}
        </Col>

        {/* RIGHT — checkout box */}
        <Col lg={4}>
          <div className="checkout-box p-3 border rounded">
            <p className="mb-2">
              Subtotal ({items} items):
              <span className="fw-bold"> ${subtotal.toFixed(2)}</span>
            </p>
            <Form.Check
              type="checkbox"
              id="gift"
              label="This order contains a gift"
              className="small mb-3"
            />
            <Button variant="warning" className="w-100">
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
