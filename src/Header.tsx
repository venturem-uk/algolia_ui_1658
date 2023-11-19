import React from "react";

interface HeaderProps {
  title: string;
  backgroundImage: string;
}

const Header: React.FC<HeaderProps> = ({ title, backgroundImage }) => {
  const headerStyle: React.CSSProperties = {
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#F57777",
    padding: "120px 250px",
    fontFamily: "Fantasy"
  };

  const h1Style: React.CSSProperties = {
    padding: "none",
    textAlign: "center",
    opacity: "1",
    transform: "translateY(200%)",
    fontFamily: "HeaderFont,Fantasy, Verdana",
    textShadow: "8px 8px 6px rgba(228, 128, 128, 0.8)"
  };

  return (
    <header style={headerStyle}>
      <div style={h1Style}>
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
