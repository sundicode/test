import React, { FC, ReactNode } from "react";
type ContainerProps = {
  children: ReactNode;
};
const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="min-h-screen w-screen">{children}</div>;
};

export default Container;
