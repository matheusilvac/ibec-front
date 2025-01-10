"use client";

import { useSideBar } from "@/context/sideBarContext";

export const HandleSideBar = () => {
  const { sideOpen, setSideOpen } = useSideBar();

  const toggleSideBar = () => {
    setSideOpen(!sideOpen);
  };

  return {
    sideOpen,
    setSideOpen,
    toggleSideBar,
  };
};
