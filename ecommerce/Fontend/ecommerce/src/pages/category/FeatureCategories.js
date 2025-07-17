import React from "react";
import "./FeatureCategories.css";
import { useNavigate } from "react-router-dom";

import menImage from "../../assets/ts1.jpg";
import womenImage from "../../assets/tsnu1.png";
import sportImage from "../../assets/thethao11.png";

const categories = [
  { name: "Nam", img: menImage, gender: "MALE" },
  { name: "Nữ", img: womenImage, gender: "FEMALE" },
  { name: "Thể thao", img: sportImage, gender: "UNISEX" }
];

const FeatureCategories = () => {
  const navigate = useNavigate();

  const handleClick = (gender) => {
    navigate(`/productlist?gender=${gender}`);
  };

  return (
    <div className="feature-categories">
      {categories.map((cat) => (
        <div
          className="category-card"
          key={cat.name}
          onClick={() => handleClick(cat.gender)}
          style={{ cursor: "pointer" }}
        >
          <img src={cat.img} alt={cat.name} />
          <h3>{cat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default FeatureCategories;
