import clsx from "clsx";
import { useId } from "react";

type InputCheckBoxProps = {
  labelText?: string;
  type?: "checkbox";
} & React.ComponentProps<"input">;

export function InputCheckBox({
  type = "checkbox",
  labelText = "",
  ...props
}: InputCheckBoxProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "w-d h-4 outline-none focus:ring-2 focus:ring-blue-500",
          props.className
        )}
        id={id}
        type={type}
      />
    </div>
  );
}
