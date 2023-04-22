import React from "react";
import { Square } from "./cell.d";

const Cell: React.FC<{ dark?: boolean; active?: boolean }> = ({
  dark,
  active,
}) => {
  return <Square active={active} dark={dark} />;
};

export default Cell;
