import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Products = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill={"#244844"}
    style={{
      enableBackground: "new 0 0 24 24",
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M4 16V4H2C.7 4 .6 2 2 2h3c.6 0 1 .4 1 1v12h12.4l2-8H8C6.7 7 6.8 5 8 5h13.7c.6 0 1 .4 1 1v.2l-2.5 10c-.1.4-.5.8-1 .8H5c-.6 0-1-.4-1-1zm2 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    <Path d="M9.4 5h2v2h-2z" />
  </Svg>
)
export default Products
