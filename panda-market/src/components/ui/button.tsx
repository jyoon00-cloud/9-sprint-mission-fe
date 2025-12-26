import { twMerge } from "tailwind-merge";

export function BtnSmall({ children, ...props }) {
  const className = twMerge(
    "bg-blue-400  text-white border-none rounded-lg items-center justify-center w-22 h-10.5 hover: cursor-pointer",
    props.className
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}

export function BtnMedium({ children, ...props }) {
  const className = twMerge(
    "bg-blue-400 text-white  border-none rounded-lg items-center justify-center  w-60 h-12  hover: cursor-pointer ",
    props.className
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
export function BtnLarge({ children, ...props }) {
  const className = twMerge(
    "bg-blue-400 text-white rounded-[2.5rem] border-none  items-center justify-center  w-160 h-14  hover: cursor-pointer ",
    props.className
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
