import { twMerge } from "tailwind-merge";

type InputBoxProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};
export function InputBox({ className, ...props }: InputBoxProps) {
  const mergedClass = twMerge(
    "flex flex-wrap bg-gray-100 w-full border-2.5 resize-none whitespace-preline  text-gray-400 rounded-xl p-4",
    className
  );
  return <textarea className={mergedClass} {...props} />;
}

type SmallInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function SmallInput({ className, ...props }: SmallInputProps) {
  const mergedClass = twMerge(
    "flex flex-wrap bg-gray-100 w-full border-2.5  text-gray-400 rounded-xl p-4",
    className
  );
  return <input className={mergedClass} {...props} />;
}
