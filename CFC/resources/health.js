import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Health = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={25} height={25} fill="#06370B" {...props}>
    <Path
      d="M29.47 15.27a7.91 7.91 0 0 0 .25-2.06 8 8 0 0 0-8-8h-.09A8 8 0 0 0 16 7.58a8.2 8.2 0 0 0-5.71-2.26 8.16 8.16 0 0 0-7.85 10 1 1 0 0 0-.43.83 1 1 0 0 0 1 1h.05a8.31 8.31 0 0 0 1.58 2.18l.43.39a1.07 1.07 0 0 0 .14.16l10.22 10a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.3l10-10.23a1.06 1.06 0 0 0 .24-.39l.32-.31a7.94 7.94 0 0 0 1.32-1.8H29a1 1 0 0 0 1-1 1 1 0 0 0-.53-.87ZM6 9.18a6.15 6.15 0 0 1 8.7-.09 5.38 5.38 0 0 1 .49.54 1.22 1.22 0 0 0 .15.17 1.06 1.06 0 0 0 1.45-.06l.11-.13a3.55 3.55 0 0 1 .47-.55 6 6 0 0 1 4.27-1.82h.06a6 6 0 0 1 5.75 7.87L18.26 15a1 1 0 0 0-.92.61L17 14.28a1 1 0 0 0-.61-.67 1 1 0 0 0-.91.11l-1.26.85-1.4-4a1 1 0 0 0-.8-.66 1 1 0 0 0-1 .4L7.57 15l-3.12.08A6.13 6.13 0 0 1 6 9.18Zm20 8.35a4.43 4.43 0 0 1-.55.49 1 1 0 0 0-.39.6l-8.93 9.12-9.29-9.09a1 1 0 0 0-.27-.33 4.23 4.23 0 0 1-.51-.44 5.65 5.65 0 0 1-.67-.81L8.11 17a1 1 0 0 0 .78-.41L11.52 13l1.2 3.45a1 1 0 0 0 .63.62 1 1 0 0 0 .88-.12l1.18-.8.79 2.9a1 1 0 0 0 .92.74h.05a1 1 0 0 0 .93-.64l.83-2.15 7.41.09a4.58 4.58 0 0 1-.34.44Z"
      data-name="Layer 22"
    />
  </Svg>
)
export default Health