'use client'

import MenuButton from "./menu-button/menu-button";
import { LuConstruction } from "react-icons/lu";
import { LuCalculator } from "react-icons/lu";
import { LuWheat } from "react-icons/lu";
import { CiPizza } from "react-icons/ci";
import { usePathname } from 'next/navigation'
import Link from "next/link";

const Pages = {
  PizzaRecipes: '/pizza-recipes',
  DoughRecipes: '/dough-recipes',
  Calculator: '/pizza-calculator',
}

export default function FooterMenu() {
  const pathname = usePathname();

  return (
    <div className="pt-3 pb-3 pl-6 pr-6 sticky top-full flex justify-around w-full shadow-white shadow-2xl">
    <MenuButton active={pathname.includes(Pages.PizzaRecipes) }>
      <Link href={Pages.PizzaRecipes}><CiPizza className="w-full h-full"/></Link>
    </MenuButton>
      
      <MenuButton active={pathname.includes(Pages.DoughRecipes) }>
        <Link href={Pages.DoughRecipes}><LuWheat className="w-full h-full"/></Link>
      </MenuButton>
      
      <MenuButton active={pathname.includes(Pages.Calculator) }>
        <Link href={Pages.Calculator}><LuCalculator className="w-full h-full"/></Link>
      </MenuButton>

      <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
      <MenuButton><LuConstruction className="w-full h-full"/></MenuButton>
    </div>
  );
}
