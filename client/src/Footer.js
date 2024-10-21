import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="bg-dark text-white text-center py-3"
      style={{
        height: "30px",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center h-100">
        <p className="mb-0 small">© 2024 SoundWave. All Rights Reserved. JH</p>
      </Container>
    </footer>
  );
}
