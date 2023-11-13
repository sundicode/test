import cn from "@/utils/cn";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
interface Ibutton {
  children: ReactNode;
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: FC<ButtonProps & Ibutton> = ({ className, children }) => {
  return (
    <button className={cn("py-2 px-5 rounded-[.2rem]", className)}>
      {children}
    </button>
  );
};
export default Button;
