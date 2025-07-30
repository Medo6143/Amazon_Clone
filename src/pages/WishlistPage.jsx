import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useproductCart';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();
    const { addItemToCart } = useCart();

    if (!items.length) return <p className="py-5 text-center">Wishlist is empty</p>;

    return (
        <Container className="py-4">
            <Row xs={1} md={2} lg={3} className="g-4">
                {items.map(p => (
                    <Col key={p.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" loading="lazy" src={p.image} style={{ objectFit: 'contain', height: 200 }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title style={{ fontSize: '1rem' }}>{p.title}</Card.Title>
                                <h5 className="text-danger my-2">${p.price}</h5>
                                <div className="mt-auto d-flex gap-2">
                                    <Button
                                        variant="warning"
                                        className="flex-grow-1"
                                        onClick={() => {
                                            addItemToCart(p);
                                            removeItem(p.id)
                                        }}
                                    >
                                        <FaShoppingCart className="me-2" />
                                        Add to Cart
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => removeItem(p.id)}>
                                        <FaTrashAlt />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
