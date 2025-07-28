import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart, FaMinus, FaPlus, FaTrashAlt, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import ProductCardSkeleton from '../components/ui/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useproductCart';
import { useWishlist } from '../hooks/useWishlist';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { products, loading, error } = useProducts();
  const { addItemToCart, decreaseItemQuantity, removeItem, getQuantity } = useCart();
  const { inWishlist, addItem, removeItem: removeWish } = useWishlist();

  useEffect(() => {
    setCurrentPage(1); // reset on category change
  }, [categoryName]);

  const filteredProducts = products.filter(product =>
    product.category.toLowerCase() === categoryName.toLowerCase()
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const paginate = (page) => setCurrentPage(page);

  const renderRating = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<FontAwesomeIcon key={`f-${i}`} icon={faStar} className="text-warning" />);
    if (half) stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning" />);
    for (let i = stars.length; i < 5; i++) stars.push(<FontAwesomeIcon key={`e-${i}`} icon={faStar} className="text-secondary" />);
    return stars;
  };

  if (loading) {
    return (
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {[...Array(8)].map((_, idx) => (
          <Col key={idx}><ProductCardSkeleton /></Col>
        ))}
      </Row>
    );
  }

  if (error) return <div className="text-center py-5"><h2>Error: {error}</h2></div>;

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4 text-capitalize">{categoryName} Products</h2>

      {/* Product Grid */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm position-relative">
              <Link to={`/product/${product.id}`}>
                <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '200px', cursor: 'pointer' }}>
                  <Card.Img variant="top" src={product.image} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              </Link>

              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: '1rem' }}>
                  {product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
                </Card.Title>

                <div className="mb-2">
                  {renderRating(product.rating.rate)}
                  <small className="text-muted ms-2">({product.rating.count})</small>
                </div>

                <div className="mt-auto">
                  <h5 className="text-danger mb-3">${product.price}</h5>

                  {/* Wishlist */}
                  <div className="position-absolute top-0 end-0 p-2">
                    {inWishlist(product.id) ? (
                      <FaHeart size={20} color="#e74c3c" style={{ cursor: 'pointer' }} onClick={() => removeWish(product.id)} />
                    ) : (
                      <FaRegHeart size={20} color="#555" style={{ cursor: 'pointer' }} onClick={() => addItem(product)} />
                    )}
                  </div>

                  {/* Cart Buttons */}
                  {getQuantity(product.id) === 0 ? (
                    <Button variant="warning" className="w-100" onClick={() => addItemToCart(product)}>
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                        <Button variant="light" onClick={() => decreaseItemQuantity(product.id)}>
                          <FaMinus />
                        </Button>
                        <span className="px-3 fw-bold text-muted">{getQuantity(product.id)}</span>
                        <Button variant="light" onClick={() => addItemToCart(product)}>
                          <FaPlus />
                        </Button>
                      </div>
                      <Button variant="link" className="text-danger fw-bold" onClick={() => removeItem(product.id)}>
                        <FaTrashAlt className="me-1" /> Remove
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Body>

              {product.price < 30 && (
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">Sale</Badge>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(n => (
                <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => paginate(n + 1)}>
                  {n + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <h3>No products found in this category</h3>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CategoryPage;
