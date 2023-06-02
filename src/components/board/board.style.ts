import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const Wrapper = styled(Paper)`
  position: relative;
  padding: 20px;
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 80px);
`;