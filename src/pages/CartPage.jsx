import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CartItem from '../components/ui/CartItem';
import { useCart } from '../hooks/useproductCart';
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

  const changeQty = (id, newQty) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const diff = newQty - item.quantity;

    if (diff > 0) addItemToCart(item, diff);

    // decrease — remove 1 unit per dispatch (slice already handles “if qty==1 remove row”)
    if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) decreaseItemQuantity(id);
    }
  };

  const saveForLater = id =>
    alert(`Saved item ${id} for later (stub for future wishlist feature)`);

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
              /* CartItem still expects `qty`, so rename on the fly */
              item={{ ...item, qty: item.quantity }}
              onQtyChange={changeQty}
              onRemove={removeItem}
              onSaveLater={saveForLater}
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