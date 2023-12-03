import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
type pageProps = { children: ReactNode };
const Modal: FC<pageProps> = ({ children }) => {
  const [Open, setOpen] = useState<boolean>(false);
  const closeModal = () => {};
  useEffect(() => {}, [Open]);
  useCallback(() => {}, []);
  return (
    <div className=" bg-neutral-800 absolute insert-0 z-40">
      <div>
        <BiX onClick={closeModal} size={20} className="text-white" />
      </div>
      <div className="">
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
