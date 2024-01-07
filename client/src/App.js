import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home/home';
import Cart from './components/Cart/cart';
import History from './components/History/history';

function App() {
  return (
    <Router>
      <>
        <Navbar bg="dark" variant="dark" class="navbar navbar-expand-lg bg-body-tertiary">
          <Container>
            <Navbar.Brand as={NavLink} to="/">Eazr</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history">
                History
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart">
                Cart
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </>
    </Router>
  );
}

export default App;
