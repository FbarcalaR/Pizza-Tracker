import MenuButton from "./menu-button/menu-button";
import { CiPizza } from "react-icons/ci";
import { LuConstruction } from "react-icons/lu";

type IProps = {
  children: React.ReactNode;
};

export default function FooterMenu() {
  return (
    <div className="pt-3 pb-3 pl-6 pr-6 sticky top-full flex justify-around w-full">
        <MenuButton active={true}><CiPizza className="w-full h-full"/></MenuButton>
        <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
        <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
        <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
        <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
    </div>
  );
}
