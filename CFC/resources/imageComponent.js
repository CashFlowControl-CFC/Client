import React from "react";
import Food from "./food";
import Health from "./health";
import Family from "./family";
import Sport from "./sport";
import Gas from "./gas";
import Bus from "./bus";
import Gift from "./gift";
import Plus from "./plus";

const getImageComponent = (imageName, width, height) => {
    switch (imageName) {
      case "plus":
        return <Plus width={width} height={height}/>;
      case "food.js":
        return <Food width={width} height={height}/>;
      case "family.js":
        return <Family width={width} height={height}/>;
      case "health.js":
        return <Health width={width} height={height}/>;
      case "sport.js":
        return <Sport width={width} height={height}/>;
      case 'gas.js':
        return <Gas width={width} height={height}/>;
      case 'transport.js':
        return <Bus width={width} height={height}/>;
      case 'gifts.js':
        return <Gift width={width} height={height}/>;
        
      // Добавьте другие кейсы для других SVG файлов
      default:
        return null;
    }
  };

export default getImageComponent;