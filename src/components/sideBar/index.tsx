import { HandleSideBar } from "@/hooks/handleSideBar";
import { FaBook } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoLibrary } from "react-icons/io5";

import { Roboto } from "next/font/google";
import Link from "next/link";
import { PiStudentBold } from "react-icons/pi";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"], // Defina os pesos que você precisa
});


export const SideBar = () => {
  const { toggleSideBar } = HandleSideBar();
  return (
    <div className={`w-52 h-screen shadow-lg right-0 absolute top-28 border-[#B9B9B9] bg-[#0A1A2D] z-50 animate-fade-left animate-once animate-ease-in-out animate-normal animate-duration-500 px-5 py-2 ${roboto.className}`}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
          <div className="text-3xl">
            <GoHomeFill />
          </div>
          <p className="text-lg font-medium flex">Inicio</p>
        </div>
        <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
          <div className="text-3xl">
            <IoLibrary  />
          </div>
          <p className="text-lg font-medium flex">Curso</p>
        </div>
        <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
          <div className="text-3xl">
            <FaBook  />
          </div>
          <p className="text-lg font-medium flex">Livraria</p>
        </div>
        <button onClick={toggleSideBar} className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
          <div className="text-3xl">
            <PiStudentBold  />
          </div>
          <Link href="/login" className="text-lg font-medium flex">Portal do aluno</Link>
        </button>
      </div>
    </div>
  );
};
