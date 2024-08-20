import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, Styles } from 'react-native-svg';
import styled from 'styled-components/native';

export default function HelmetMain() {
  return (
    <Container>
      <Svg
        id="Camada_2"
        viewBox="0 0 1070.1 826.42"
        width="100%"
        height="100%"
        rotation={15}
        style={styles.helmet}
      >
        <G id="Camada_1-2" data-name="Camada_1">
          <G>
            <Path
                fill="#1fd67e"
                stroke="#7a7a7a"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M1025.82,825.42H150.61s-24.71-54.69-32.46-78.78C-152.8,413.21,74.74,19.69,508.75,1c212.43,0,312.2,69.32,400.63,161.33,10.61,11.04,20.87,25.68,30.71,42.94,46.53,81.61,83.73,221.71,104.95,316.09,5.98,25.47,11.42,51.46,16.14,77.88.06.31.12.62.17.93,1.74,9.4,2.79,15.69,3.11,18.1,21.48,164.26-38.64,207.15-38.64,207.15Z"
            />
            <Path stroke="#7a7a7a"
                strokeMiterlimit={10}
                strokeWidth={2} 
                fill='#44e497'
               d="M1045.69,530.41v.06c-.01-.09-.05-.18-.07-.27.03.08.05.14.07.21Z" />
            <G>
              <Path
                stroke="#7a7a7a"
                strokeMiterlimit={10}
                strokeWidth={2}
                fill='#44e497'
                d="M1064.46,618.27c-111.52,12.37-252.93-13.9-377.31-51.05l-128.54-306.96c112.93,14.11,277.61-11.56,381.48-54.99,46.53,81.61,83.73,221.71,104.95,316.09,5.98,25.47,11.42,51.46,16.14,77.88.06.31.12.62.17.93,1.74,9.4,2.79,15.69,3.11,18.1Z"
              />
              <Path
                stroke="#7a7a7a"
                strokeMiterlimit={10}
                strokeWidth={2}
                fill= '#34c07c'
                d="M687.15,567.22c-128.54-30.45-258.85-82.54-297.47-213.37-26.25-86.72,27.06-130.37,110.77-105.78,19.21,4.94,38.55,9.26,58.16,12.19l128.54,306.96Z"
              />
            </G>
          </G>
        </G>
      </Svg>
    </Container>
  );
}

const Container = styled.View`
    flex: 1;
    justify-Content: 'start';
    align-Items: 'start';
    width: 140%;
    top: -22%;
    left: -18%;
    
`
const styles = StyleSheet.create({
  helmet: {
    width: '100%',
    height: '100%',
    position: 'static',
    transform: [{ rotate: '7deg' }],
  },
});
