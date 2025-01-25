import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col>
            <h1>Email Builder</h1>
            <p>Create beautiful email templates with ease</p>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
