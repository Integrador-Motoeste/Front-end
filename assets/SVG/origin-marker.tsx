import React from 'react';
import Svg, { G, Circle, Defs, ClipPath, Rect } from 'react-native-svg';

const originMarker = (props) => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_188_9)">
                <Circle cx={12} cy={12} r={10.5} stroke="#1FD87F" strokeWidth={3} />
                <Circle cx={12} cy={12} r={4.5} stroke="#1FD87F" strokeWidth={3} />
            </G>
            <Defs>
                <ClipPath id="clip0_188_9">
                    <Rect width={24} height={24} fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default originMarker;
