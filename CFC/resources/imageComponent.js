import React from "react";
import Svg, { SvgFromUri } from "react-native-svg";
const getImage = (uri, width, height, color) => {
        return  <Svg height={height} width={width}>
                    <SvgFromUri
                    uri={uri}
                    width="100%"
                    height="100%"
                    fill={color}
                    />
                </Svg>
    }

export default getImage;