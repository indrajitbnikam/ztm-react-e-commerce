import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {

  const handleMenuClick = () => {
    history.push(`${match.url}${linkUrl}`);
  }

  return (
    <div
      className={`menu-item ${size}`}
      onClick={handleMenuClick}
      >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
