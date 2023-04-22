import styled from "styled-components";

export const FigureContainer = styled.div<{
  x: number;
  y: number;
}>`
  position: absolute;
  top: ${(props) => {
    return props.y * 80 - 55 + "px";
  }};
  left: ${(props) => {
    return props.x * 80 - 55 + "px";
  }};
`;
