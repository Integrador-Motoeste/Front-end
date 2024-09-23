import React from 'react';
import Svg, { Path } from 'react-native-svg';

type props = {
  width?: number | string;
  height?: number | string;
}

const CheckIcon = (props: props) => (
  <Svg width={props.width ? props.width : "118"} height={props.height ? props.height : "118"} viewBox="0 0 118 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M117.333 58.5C117.333 90.4863 91.2164 116.417 59.0001 116.417C26.7835 116.417 0.666748 90.4863 0.666748 58.5C0.666748 26.5135 26.7835 0.583374 59.0001 0.583374C91.2164 0.583374 117.333 26.5135 117.333 58.5ZM82.5102 40.9494C84.2187 42.6457 84.2187 45.396 82.5102 47.0922L53.3435 76.0505C51.6349 77.7469 48.8652 77.7469 47.1565 76.0505L35.4898 64.4672C33.7813 62.7708 33.7813 60.0209 35.4898 58.3246C37.1983 56.6282 39.9685 56.6282 41.677 58.3246L50.2501 66.836L63.2864 53.8928L76.3233 40.9494C78.0319 39.2531 80.8016 39.2531 82.5102 40.9494Z" 
      fill="#1FD87F"
    />
  </Svg>
);

export default CheckIcon;