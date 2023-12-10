import React, { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ContainerProps = {
  children: ReactNode;
};
const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      <ToastContainer />
      {children}
    </div>
  );
};

export default Container;
