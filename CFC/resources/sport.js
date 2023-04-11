import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Sport = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    strokeWidth={1.5}
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.4 7H4.6a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6ZM19.4 7h-2.8a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 14.4V9.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H1.6a.6.6 0 0 1-.6-.6ZM23 14.4V9.6a.6.6 0 0 0-.6-.6h-1.8a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6h1.8a.6.6 0 0 0 .6-.6ZM8 12h8"
    />
  </Svg>
)
export default Sport
