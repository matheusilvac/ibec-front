import Link from "next/link";
import { SideBarIcon } from "../sideBar/sideBarIcon";

export const NavBar = () => {
  return (
    <nav className="w-full h-28 flex items-center justify-center bg-[#0A1A2D] fixed top-0 z-50 text-white">
      <div className="w-full flex justify-between px-2 md:px-10 items-center">
        <div>
          <Link href="/">
            <img
              src="/ibec-abreviado-bg-branco.png"
              alt="Logo IBEC"
              className="w-1/2 sm:w-1/4 h-auto object-fill"
            ></img>
          </Link>
        </div>
        <div className="hidden h-full sm:flex justify-center items-center">
          <ul className="w-full flex justify-center gap-2 md:gap-5 uppercase text-xs">
            <Link href="/" className="hover:bg-[#e6a44e] duration-500 transition-all border-[3px] border-[#e6a44e] p-2 w-16 h-16 rounded-full flex justify-center items-center">inicio</Link>
            <Link href="/" className="hover:bg-[#e6a44e] duration-500 transition-all border-[3px] border-[#e6a44e] p-2 w-16 h-16 rounded-full flex justify-center items-center">curso</Link>
            <Link href="/" className="hover:bg-[#e6a44e] duration-500 transition-all border-[3px] border-[#e6a44e] p-2 w-16 h-16 rounded-full flex justify-center items-center">sobre</Link>
            <Link href="/" className="hover:bg-[#e6a44e] duration-500 transition-all border-[3px] border-[#e6a44e] p-2 w-16 h-16 rounded-full flex justify-center items-center">livraria</Link>
          </ul>
        </div>
        <div className="flex sm:hidden pr-2">
          <SideBarIcon/>
        </div>
      </div>
    </nav>
  );
};
