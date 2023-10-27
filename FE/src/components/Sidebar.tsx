import Link from "next/link";

interface Props {
  menus: JSX.Element[];
}

export default function Sidebar({ menus }: Props) {
  return (
    <div className="w-1/6 h-[91vh] bg-white shadow-md mt-2 rounded-lg">
      {menus.map((menu, idx) => (
        <div key={idx}>{menu}</div>
      ))}
    </div>
  );
}
