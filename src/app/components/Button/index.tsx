import { ButtonHTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { LoadingSpinner } from "../Loading";

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const button = tv({
  slots: {
    container:
      "h-[52px] px-[64px] flex items-center justify-center bg-primary text-white border-none font-bold text-[18px] rounded-lg",
  },
});

const Button = ({
  children,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const { container } = button();

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={container({ className })}
    >
      {loading ? (
        <LoadingSpinner className="h-[24px] w-[24px] text-white" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
