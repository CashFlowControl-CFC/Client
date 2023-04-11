import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const LeftArrowSm = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="#FFF"
    viewBox="0 -6.5 36 36"
    {...props}
  >
    <Path
      fill="#FFF"
      fillRule="nonzero"
      d="M10.892.29.35 10.742l-.059.054a.984.984 0 0 0-.291.642v.124c.014.234.11.463.291.642l.052.044L10.892 22.71c.39.387 1.023.387 1.413 0a.985.985 0 0 0 0-1.402l-9.008-8.934h31.704c.552 0 .999-.443.999-.99a.995.995 0 0 0-1-.992H3.533l8.773-8.7a.985.985 0 0 0 0-1.402 1.005 1.005 0 0 0-1.413 0ZM.885 11.383l10.714 10.626L.998 11.5v-.004l.059-.053.06-.06H.885Z"
    />
  </Svg>
)
export default LeftArrowSm
