import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

type InputTypes =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = {
  name: string;
  error?: string;
  as?: React.ElementType;
  containerClassName?: string;
} & InputTypes;

const input = tv({
  slots: {
    field:
      "h-[52px] placeholder-grey w-full rounded-lg px-[16px] outline-primary py-[12px] text-black bg-input",
    container: "w-full",
  },
  variants: {
    status: {
      error: {
        field: "border-red-600 border",
      },
      default: {
        field: "",
      },
    },
  },
});

export const InputDefaultAsType = "input" as const;

const Input = ({
  name,
  className,
  error,
  as,
  containerClassName,
  ...props
}: InputProps) => {
  const Tag = as || InputDefaultAsType;
  const { register } = useFormContext();
  const { field, container } = input();

  return (
    <div className={container({ className: containerClassName })}>
      <Tag
        className={field({ status: error ? "error" : "default", className })}
        {...props}
        {...register(name)}
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default Input;
