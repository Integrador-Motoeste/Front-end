import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Header({ children }: { children: ReactNode }) {
    return (
    <GradientContainer colors={['#1FD87F', '#1BB66C']}>
        {children}
    </GradientContainer>
  );
};


const GradientContainer = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  width: 100%;
  height: 175px;
  padding: 5%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: left;
  justify-content: space-between;
`;
