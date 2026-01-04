import { twMerge } from "tailwind-merge";

interface TagBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TagBox({ children, ...props }: TagBoxProps) {
  const className = twMerge(
    "bg-gray-100 block border-none rounded-[26px] items-center justify-center w-auto leading-6.5 py-1.5 px-9",
    props.className
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
