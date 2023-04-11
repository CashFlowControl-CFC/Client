import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const Gift = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill='#400C0C' {...props}>
    <Path fill="none" d="M0 0h256v256H0z" />
    <Rect
      width={192}
      height={48}
      x={32}
      y={80}
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      rx={8}
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M208 128v72a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8v-72M128 80v128M173.3 68.7C161.9 80 128 80 128 80s0-33.9 11.3-45.3a24 24 0 0 1 34 34ZM82.7 68.7C94.1 80 128 80 128 80s0-33.9-11.3-45.3a24 24 0 0 0-34 34Z"
    />
  </Svg>
)
export default Gift
