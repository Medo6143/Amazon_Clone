import React from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../services/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); 
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h5>You need to log in to view your profile.</h5>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body className="text-center">
              <img
                src={'https://avatar.iran.liara.run/public/20'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <h4>{user.displayName || 'No name provided'}</h4>
              <p className="text-muted">{user.email}</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
