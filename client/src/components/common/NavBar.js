import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <img
          src={logo}
          alt="Logo"
          width="100"
          height="40"
          className="d-inline-block align-top"
          style={{
            marginRight: "10px",
            marginLeft: "-40px",
            filter: "invert(100%)",
          }}
        />
        <Navbar.Brand as={Link} to="/">
          SoundWave
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/statistics">
              Stats
            </Nav.Link>
            <Nav.Link as={Link} to="/"></Nav.Link>
            <Nav.Link as={Link} to="/song-countdown">
              Countdown
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
