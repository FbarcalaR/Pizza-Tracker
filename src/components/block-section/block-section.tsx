import { useState } from "react";
import DropdownArrow from "../dropdown-arrow/dropdown-arrow";
import Title from "../title/title";

type IProps = {
  title?: string;
  titleTemplate?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function BlockSection({ title, titleTemplate, children, className, bodyClassName }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Title
      className={className}
      titleClassName="cursor-pointer"
      title={title}
      titleTemplate={titleTemplate}
      onClick={() => setIsCollapsed(prev => !prev)}
      icon={
        <DropdownArrow
          className={`transition-all duration-300 ${
            !isCollapsed && "rotate-180"
          }`}
        />
      }
    >
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? "h-0" : "h-full"
        } ${bodyClassName}`}
      >
      {children}
      </div>
    </Title>
  );
}
