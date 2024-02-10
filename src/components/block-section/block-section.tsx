import { useState } from "react";
import DropdownArrow from "../dropdown-arrow/dropdown-arrow";

type IProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function BlockSection({ title, children, className }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={className}>
      <div
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="w-full border-b-2 border-main-color relative text-base"
      >
        <span className="w-full font-bold">{title}</span>
        <DropdownArrow
          className={`transition-all duration-300 ${
            !isCollapsed && "rotate-180"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? "h-0" : "h-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
