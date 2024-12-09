import React, { useRef, useEffect } from "react";
import "./css/ThreeDText.css";

const ThreeDText = ({ text }) => {
  const textRef = useRef(null); // Reference to the text element

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      // Calculate the rotation angles based on the pointer's position
      const xRotation = (e.clientY / innerHeight - 0.5) * -60; // Y-axis rotation
      const yRotation = (e.clientX / innerWidth - 0.5) * 60; // X-axis rotation

      // Apply the 3D transformation
      if (textRef.current) {
        textRef.current.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
      }
    };

    // Add event listener for mousemove
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="text-body">
      <div id="container" style={{ perspective: "1000px" }}>
        <div
          ref={textRef}
          id="text"
          style={{
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#fff",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ThreeDText;
