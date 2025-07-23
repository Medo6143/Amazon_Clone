import { Row, Col, Button, Form } from 'react-bootstrap';

export default function CartItem({
  item,
  onQtyChange,
  onRemove,
  onSaveLater,
}) {
  return (
    <Row className="py-3 border-bottom">
      <Col xs={4} md={3}>
        <img src={item.image} alt={item.title} className="img-fluid" />
      </Col>

      <Col xs={8} md={6}>
        <h6 className="fw-normal">{item.title}</h6>
        <p className="fw-bold mb-1">${item.price.toFixed(2)}</p>
        <p className="small text-success mb-2">In Stock</p>

        <div className="d-flex align-items-center">
          <Form.Select
            size="sm"
            className="qty-dropdown me-3"
            value={item.qty}
            onChange={e => onQtyChange(item.id, Number(e.target.value))}
          >
            {[...Array(10).keys()].map(n =>
              <option key={n + 1} value={n + 1}>Qty: {n + 1}</option>
            )}
          </Form.Select>

          <Button variant="link" size="sm" onClick={() => onRemove(item.id)}>
            Delete
          </Button>

          <Button variant="link" size="sm" onClick={() => onSaveLater(item.id)}>
            Save for later
          </Button>
        </div>
      </Col>
    </Row>
  );
}
