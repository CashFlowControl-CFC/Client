import React from "react";
import Food from "./food";
import Health from "./health";
import Family from "./family";

const getImageComponent = (imageName) => {
    switch (imageName) {
      case "food.js":
        return <Food />;
      case "family.js":
        return <Family/>;
        case "health.js":
          return <Health/>;
      // Добавьте другие кейсы для других SVG файлов
      default:
        return null;
    }
  };

export default getImageComponent;