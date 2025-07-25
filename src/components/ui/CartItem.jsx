import { Row, Col, Button, Form } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus, FaTrashAlt, FaHeart } from 'react-icons/fa'

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onSaveLater,
}) {
  return (
    <Row className="py-3 border-bottom cart-row">
      {/* image */}
      <Col xs={4} md={3}>
        <img src={item.image} alt={item.title} className="img-fluid" />
      </Col>

      {/* details & controls */}
      <Col xs={8} md={9} className="d-flex flex-column">
        <h6 className="fw-normal">{item.title}</h6>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          {/* quantity pill */}
          <div className="d-flex align-items-center border rounded-pill qty-pill">
            <Button
              variant="light"
              className="pill-btn"
              onClick={onDecrease}
            >
              <FaMinus />
            </Button>

            <span className="px-3 fw-bold small text-muted">
              {item.quantity}
            </span>

            <Button
              variant="light"
              className="pill-btn"
              onClick={onIncrease}
            >
              <FaPlus />
            </Button>
          </div>

          {/* unit price */}
          <span className="fw-bold">${item.price.toFixed(2)}</span>

          {/* actions */}
          <Button variant="link" size="sm" className="text-danger p-0" onClick={onRemove}>
            <FaTrashAlt className="me-1" />
            Remove
          </Button>

          <Button variant="link" size="sm" onClick={onSaveLater}>
            <FaHeart className="me-1 text-danger" />
            Move to Wishlist
          </Button>
        </div>
      </Col>
    </Row>
  );
}
