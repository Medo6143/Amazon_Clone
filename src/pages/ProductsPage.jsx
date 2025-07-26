import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useproductCart';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const { addItemToCart } = useCart();
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  // Filter products based on search term, category and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || (selectedPrice === 'under30' && product.price < 30) || (selectedPrice === 'over30' && product.price >= 30);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-secondary" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {[...Array(8)].map((_, idx) => (
          <Col key={idx}>
            <ProductCardSkeleton />
          </Col>
        ))}
      </Row>
    );
  }
  if (error) return <div className="text-center py-5"><h2>Error: {error}</h2></div>;

  return (
    <Container fluid className="py-4">
      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="warning">
              <FontAwesomeIcon icon={faFilter} className="me-2" />
              Filters
            </Button>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Form.Select
            style={{ width: '200px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </Form.Select>
          <Form.Select
            style={{ width: '200px' }}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="under30">Under $30</option>
            <option value="over30">Over $30</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Link to={`/products/${product.id}`}>
                <div
                  className="bg-light d-flex justify-content-center align-items-center"
                  style={{ height: '200px', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2" style={{ fontSize: '1rem' }}>
                  {product.title.length > 50
                    ? `${product.title.substring(0, 50)}...`
                    : product.title}
                </Card.Title>
                <div className="mb-2">
                  {renderRating(product.rating.rate)}
                  <small className="text-muted ms-2">({product.rating.count})</small>
                </div>
                <div className="mt-auto">
                  <h5 className="text-danger mb-3">${product.price}</h5>
                  <Button variant="warning" className="w-100" onClick={() => addItemToCart(product)}>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
              {product.price < 30 && (
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                  Sale
                </Badge>
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
              {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}

      {/* No products found message */}
      {filteredProducts.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <h3>No products found matching your criteria</h3>
            <Button variant="outline-secondary" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPrice('all');
            }}>
              Clear filters
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductsPage;