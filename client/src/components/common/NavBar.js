import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function NavBar() {
  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container>
        {/* Centered Brand Name */}
        <Navbar.Brand
          className="m-auto"
          style={{ color: "red", fontWeight: "bold" }}
          as={Link}
          to="/"
        >
          S o u n d W a v e
        </Navbar.Brand>

        {/* Navbar Links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-auto">
            <Nav.Link as={Link} to="/statistics">
              Stats
            </Nav.Link>
            <Nav.Link as={Link} to="/song-countdown">
              Countdown
            </Nav.Link>
          </Nav>

          {/* Login/Signup Button on the Far Right */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">
              <Button
                variant="outline-light bg-white text-black"
                style={{
                  fontFamily:
                    "Barlow, Open Sans, Lucida Grande, Helvetica Neue, Helvetica, Arial, Sans-serif",
                }}
              >
                SIGNUP
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
