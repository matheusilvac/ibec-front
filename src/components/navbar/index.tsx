import Link from "next/link";
import {Button, CloseButton, Drawer, Portal} from "@chakra-ui/react";
import {BookOpen, House, LibraryBig, User, Menu} from "lucide-react";

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
          <ul className="w-full flex justify-center gap-2 md:gap-5 uppercase text-sm">
            <Link href="/" className="hover:opacity-60 transition-all duration-300 flex justify-center items-center">inicio</Link>
            <Link href="/" className="hover:opacity-60 transition-all duration-300 flex justify-center items-center">curso</Link>
            <Link href="/" className="hover:opacity-60 transition-all duration-300 flex justify-center items-center">sobre</Link>
            <Link href="/" className="hover:opacity-60 transition-all duration-300 flex justify-center items-center">livraria</Link>
            <Link href="/login" className="hover:opacity-60 transition-all duration-300 flex justify-center items-center">Portal do aluno</Link>
          </ul>
        </div>
        <div className="flex sm:hidden pr-2">
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button variant="outline" size="2xl">
                <Menu />
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content className="bg-[#0A1A2D] text-white">
                  <Drawer.Header>
                    <Drawer.Title>IBEC</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
                        <div className="text-3xl">
                          <House />
                        </div>
                        <p className="text-lg font-medium flex">Inicio</p>
                      </div>
                      <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
                        <div className="text-3xl">
                          <LibraryBig />
                        </div>
                        <p className="text-lg font-medium flex">Curso</p>
                      </div>
                      <div className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
                        <div className="text-3xl">
                          <BookOpen />
                        </div>
                        <p className="text-lg font-medium flex">Livraria</p>
                      </div>
                      <button  className="w-full flex items-center gap-3 text-white py-2 px-3 hover:bg-[#1B2F45] transition-all duration-300 rounded-md cursor-pointer">
                        <div className="text-3xl">
                          <User />
                        </div>
                        <Link href="/login" className="text-lg font-medium flex">Portal do aluno</Link>
                      </button>
                    </div>
                  </Drawer.Body>
                  <Drawer.Footer>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="xl" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </div>
      </div>
    </nav>
  );
};
