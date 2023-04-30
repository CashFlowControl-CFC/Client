import React from "react";
import Products from "./products";
import Health from "./health";
import Family from "./family";
import Sport from "./sport";
import Transport from "./transport";
import Gift from "./gift";
import Plus from "./plus";

const getImageComponent = (imageName, width, height) => {
    switch (imageName) {
      case "plus":
        return <Plus width={width} height={height}/>;
      case "products.js":
        return <Products width={width} height={height}/>;
      case "family.js":
        return <Family width={width} height={height}/>;
      case "health.js":
        return <Health width={width} height={height}/>;
      case "sport.js":
        return <Sport width={width} height={height}/>;
      case 'transport.js':
        return <Transport width={width} height={height}/>;
      case 'gifts.js':
        return <Gift width={width} height={height}/>;
        
      // Добавьте другие кейсы для других SVG файлов
      default:
        return null;
    }
  };

export default getImageComponent;