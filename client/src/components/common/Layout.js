import React from "react";

// import custom navBar and footer components to wrap application pages
import NavBar from "./NavBar";
import Footer from "./Footer";
import ContentBackground from "./ContentBackground";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <ContentBackground style={{ margin: "60px 0 0 0" }} />
      {children}
      <Footer />
    </>
  );
}
