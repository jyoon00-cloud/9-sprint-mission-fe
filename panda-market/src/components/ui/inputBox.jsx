import { twMerge } from "tailwind-merge";
export function InputBox({ value, onChange, type = "text", ...props }) {
  const className = twMerge(
    "flex flex-wrap bg-gray-100 w-full border-2.5 resize-none whitespace-preline  text-gray-400 rounded-xl p-4",
    props.className
  );
  return (
    <textarea
      {...props}
      className={className}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
export function PwInput({ value, onChange, type = "text", ...props }) {
  const className = twMerge(
    "flex flex-wrap bg-gray-100 w-full border-2.5  text-gray-400 rounded-xl p-4",
    props.className
  );
  return (
    <input
      {...props}
      className={className}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
