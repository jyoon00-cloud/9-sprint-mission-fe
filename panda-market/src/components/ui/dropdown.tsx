interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function Dropdown({
  value,
  onChange,
  className,
}: DropdownProps) {
  return (
    <div
      className={`relative flex items-center w-32.5 h-10.5 border bg-white border-gray-200 border-solid pl-8 pr-6 rounded-2xl overflow-hidden ${
        className || ""
      }`}
    >
      <select className="w-full h-full" value={value} onChange={onChange}>
        <option value="recent">최신순</option>
        <option value="likes">좋아요순</option>
      </select>
    </div>
  );
}
