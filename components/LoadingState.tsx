import React from "react";
import { ScaleLoader } from "react-spinners";
const LoadingState = () => {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center bg-light">
      <ScaleLoader color="#000581" />
    </div>
  );
};

export default LoadingState;
