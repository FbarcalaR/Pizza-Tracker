import { useState } from "react";
import DropdownArrow from "../dropdown-arrow/dropdown-arrow";

type IProps = {
  title: string;
  children: React.ReactNode;
};

export default function BlockSection({ title, children }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <div
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="w-full border-b-2 border-main-color relative"
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
