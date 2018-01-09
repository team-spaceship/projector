import React from 'react';

const containerStyle = {
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translateX(-50%) translateY(-50%)",
};

const headingStyle = {
  fontSize: 110,
  textTransform: "uppercase",
  textAlign: "center",
  color: "#06fefe",
  fontWeight: 600,
  backgroundImage: "-webkit-linear-gradient(92deg, #06fefe, #37bddf)",
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent",
  webkitAnimation: "hue 80s infinite linear",
};

const linkStyle = {
  color: "#fff",
  fontSize: 18,
  textAlign: "center",
  paddingTop: 30,
  display: "block",
};

const FourOFour = () => {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>404 Page not found</h2>
      <a style={linkStyle} href="/">Back to home</a>
    </div>
  );
};

export default FourOFour;
