import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Sport = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill={"#1E4333"}
    style={{
      enableBackground: "new 0 0 24 24",
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M21.3 8.5h-1.4v-.4c0-.8-.6-1.3-1.3-1.3h-2.5c-.8 0-1.3.6-1.3 1.3v3.2H9.2V8.1c0-.8-.6-1.3-1.3-1.3H5.4c-.8 0-1.3.6-1.3 1.3v.5H2.7c-.3 0-.6 0-.9.3-.3.2-.4.6-.4 1v4.3c0 .8.6 1.3 1.3 1.3h1.4v.5c0 .8.6 1.3 1.3 1.3h2.5c.8 0 1.3-.6 1.3-1.3v-3.2h5.6V16c0 .8.6 1.3 1.3 1.3h2.5c.8 0 1.3-.6 1.3-1.3v-.5h1.4c.8 0 1.3-.6 1.3-1.3V9.9c0-.8-.6-1.4-1.3-1.4zm-.2 1.6v3.8h-1v-3.8h1zm-2.7-1.8v7.4h-2V8.3h2zm-10.8 0v7.4h-2V8.3h2zM4 10.1v3.8H2.9v-3.8H4z" />
  </Svg>
)
export default Sport
