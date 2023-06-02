import styled from "styled-components";
import { Cell } from "../../models/Cell";

export const Square = styled.div<{
  dark?: boolean;
  available: boolean;
  selected: boolean;
  onClick: (cell: Cell) => void;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;

  &:before {
    display: ${(props) => {
      return props.available ? "block" : "none";
    }};
    position: absolute;
    content: " ";
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  background-color: ${(props) => {
    if (props.selected) {
      return "red";
    }
    return props.dark ? "#779556;" : "#ebecd0";
  }};
`;

// export const Available = styled.div`
//   &:before {
//     height: 12px;
//     weight: 12px;
//     background-color: red;
//     border-radius: 50%;
//   }
// `;
