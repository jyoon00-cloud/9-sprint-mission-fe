export function BtnSmall({ children }) {
  return (
    <button className="bg-blue-400 border rounded-lg items-center justify-center w-22 h-10.5">
      {children}
    </button>
  );
}

export function BtnMedium({ children }) {
  return (
    <button className="bg-blue-400 border rounded-4xl items-center justify-center w-60 h-12">
      {children}
    </button>
  );
}
