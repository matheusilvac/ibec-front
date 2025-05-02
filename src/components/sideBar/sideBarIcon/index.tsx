'use client'
import { HandleSideBar } from "@/hooks/handleSideBar";
import { SideBar } from "..";
import { FiMenu } from "react-icons/fi";

export const SideBarIcon = () => {

    const {toggleSideBar, sideOpen} = HandleSideBar()
    return(
        <>
        <div className="flex justify-center items-center cursor-pointer text-4xl text-white">
        <FiMenu  onClick={toggleSideBar}/>
        </div>
        {sideOpen && <div className="duration-3000"><SideBar /></div>} 
        </>
    )   
}