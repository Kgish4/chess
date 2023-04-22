import styled from "styled-components";

export const Square = styled.div<{ dark?: boolean; active?: boolean }>`
  height: 80px;
  weight: 80px;
  border: 1px solid black;
  background-color: ${(props) => {
    if (props.active) {
      return "red";
    }
    return props.dark ? "#C7FFB8" : "#009900";
  }};
`;
