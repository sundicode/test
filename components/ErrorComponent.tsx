"use client";
import { FC } from "react";
interface IError {
  status: number | 500;
  message: string;
}
const ErrorComponent: FC<IError> = ({ status, message }) => {
  return (
    <div className="min-h-[80vh]">
      <div>
        <h1 className="text-[5rem] text-primary text-center font-bold">
          {status}
        </h1>
        <h1 className="text-center text-slate-600 text-md">{message}</h1>
      </div>
    </div>
  );
};

export default ErrorComponent;
