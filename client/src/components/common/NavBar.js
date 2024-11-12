import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./css/Navbar.css";

export default function NavBar() {
  return (
    <>
      <div className="navbar-wrapper">
        <div className="content-left"></div>
        <div className="content-center">
          <Link to="/dashboard" className="brand-label">
            Soundwave.FM
          </Link>
        </div>
        <div className="content-right">
          <div className="buttons-array">
            <div className="spotify-dropdown-button-container">
              Spotify
              <div className="dropdown-menu">
                <Link to="/music-player">Player</Link>
                <Link to="/song-countdown">Countdown</Link>
                <Link to="/statistics">Stats</Link>
                <Link to="/song-guesser">Song Guesser</Link>
              </div>
            </div>
            <div className="login-button-container">login</div>
            <div className="signup-button-container">
              <div className="signup-button">SIGN UP</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar bg="black" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            className="m-auto"
            style={{ color: "red", fontWeight: "bold" }}
            as={Link}
            to="/"
          >
            S o u n d W a v e
          </Navbar.Brand>

          
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
      </Navbar> */}
    </>
  );
}
