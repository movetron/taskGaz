import React from "react";
import "@/styles/column.scss";

const Column = ({ children }: { children: React.ReactNode }) => {
  return <div className="column">{children}</div>;
};

export default Column;
