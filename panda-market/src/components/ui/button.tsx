import { twMerge } from "tailwind-merge";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function BtnSmall({ children, className, ...props }: BtnProps) {
  const mergedClass = twMerge(
    "bg-blue-400  text-white border-none rounded-lg items-center justify-center w-22 h-10.5 hover: cursor-pointer",
    className
  );
  return (
    <button className={mergedClass} {...props}>
      {children}
    </button>
  );
}

export function BtnMedium({ children, className, ...props }: BtnProps) {
  const mergedClass = twMerge(
    "bg-blue-400 text-white  border-none rounded-lg items-center justify-center  w-60 h-12  hover: cursor-pointer ",
    className
  );
  return (
    <button className={mergedClass} {...props}>
      {children}
    </button>
  );
}
export function BtnLarge({ children, className, ...props }: BtnProps) {
  const mergedClass = twMerge(
    "bg-blue-400 text-white rounded-[2.5rem] border-none  items-center justify-center  w-160 h-14  hover: cursor-pointer ",
    className
  );
  return (
    <button className={mergedClass} {...props}>
      {children}
    </button>
  );
}
