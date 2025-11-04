export default function InputBox({ value, onChange, className }) {
  const defaultClassName = "flex bg-gray-100 w-full border-2.5 text-gray-400";
  const inputClassName = `${defaultClassName} ${className || ""}`;
  return (
    <input
      className={inputClassName}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
