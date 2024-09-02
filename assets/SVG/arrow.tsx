import React from 'react';
import Svg, { Path } from 'react-native-svg';


type propsType = {
    width?: number;
    height?: number;
};

const ArrowIcon = (props: propsType) => {
  return (
    <Svg width={props.width ? props.width : "31px"} height={props.height ? props.height : "31px"} viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10 29L10 2M10 29L18 20.8571M10 29L2 20.8571"
        stroke="#1FD87F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowIcon;