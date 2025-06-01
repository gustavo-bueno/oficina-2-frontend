import { RiCloseLine } from "@remixicon/react";
import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  open: boolean;
  children?: ReactNode;
  close: () => void;
};

const Modal = ({ title, open, children, close }: ModalProps) => {
  return (
    <div
      onClick={close}
      className={`${open ? "fixed" : "hidden"} inset-0 px-4 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center transition-all duration-100 ease-in-out`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 border max-w-[670px] max-h-[90%] overflow-y-auto w-full shadow-lg rounded-md bg-white"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[32px] font-bold text-black">{title}</h3>
          <button
            className="w-[48px] h-[48px] flex items-center justify-center text-black"
            aria-label="Close Modal"
            onClick={close}
          >
            <RiCloseLine />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
