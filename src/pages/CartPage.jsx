import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CartItem from '../components/ui/CartItem';
import { useCart } from '../hooks/useproductCart';
import { useWishlist } from '../hooks/useWishlist';

import '../styles/CartPage.css';


export default function CartPage() {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    addItemToCart,
    decreaseItemQuantity,
    removeItem,
  } = useCart();

  const { addItem } = useWishlist();



  return (
    <Container className="cart-page my-4">
      <Row>
        {/* LEFT — items list */}
        <Col lg={8}>
          <h4 className="cart-title">Shopping Cart</h4>

          {/* Mobile subtotal banner */}
          <p className="text-end d-lg-none">
            Subtotal ({totalQuantity} items):
            <span className="fw-bold"> ${totalPrice.toFixed(2)}</span>
          </p>

          <hr />

          {cartItems.length === 0 && (
            <p className="py-5 text-center">Your cart is empty.</p>
          )}

          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => addItemToCart(item, 1)}
              onDecrease={() => decreaseItemQuantity(item.id)}
              onRemove={() => removeItem(item.id)}
              onSaveLater={() => {
                removeItem(item.id);
                addItem(item);
              }}
            />
          ))}
        </Col>

        {/* RIGHT — checkout sidebar */}
        <Col lg={4}>
          <div className="checkout-box p-3 border rounded">
            <p className="mb-2">
              Subtotal ({totalQuantity} items):
              <span className="fw-bold"> ${totalPrice.toFixed(2)}</span>
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