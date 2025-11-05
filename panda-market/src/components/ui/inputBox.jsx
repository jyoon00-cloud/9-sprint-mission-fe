import { twMerge } from "tailwind-merge";
export default function InputBox({ value, onChange, ...props }) {
  const className = twMerge(
    "flex bg-gray-100 w-full border-2.5 text-gray-400 rounded-xl pl-4",
    props.className
  );
  return (
    <input
      {...props}
      className={className}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
