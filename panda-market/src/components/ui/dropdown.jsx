export default function DropDown() {
  return (
    <select className="flex w-32.5 h-10.5 pt-3 pb-3 pl-5 pr-5 flex-col items-start gap-2.5 border bg-white border-gray-200 border-solid">
      <option selected value={최신순}>
        최신순
      </option>
      <option value={좋아요순}>좋아요순</option>
    </select>
  );
}
