import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Plus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#4B4E53"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 12h16m-8-8v16"
    />
  </Svg>
)
export default Plus
