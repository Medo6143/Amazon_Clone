import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-3 text-danger">404</h1>
      <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </Container>
  );
};

export default NotFound;
