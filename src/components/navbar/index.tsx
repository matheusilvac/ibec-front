import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-center bg-[#0A1A2D] fixed top-0 z-50 text-white">
      <div className="w-full flex justify-between px-2 md:px-10 items-center">
        <div>
          <Link href="/">
            <img
              src="/logo_ibec.png"
              alt="Logo Entrada Certa"
              className="h-10 md:h-20 object-fill"
            ></img>
          </Link>
        </div>
        <div className=" h-full flex justify-center items-center">
          <ul className="w-full flex justify-center gap-2 md:gap-5 uppercase text-sm md:text-md">
            <Link href="/" className="hover:opacity-75 duration-500 transition-all bg-[#e6a44e] px-2 py-1 rounded-sm">inicio</Link>
            <Link href="/" className="hover:opacity-75 duration-500 transition-all bg-[#e6a44e] px-2 py-1 rounded-sm">curso</Link>
            <Link href="/" className="hover:opacity-75 duration-500 transition-all bg-[#e6a44e] px-2 py-1 rounded-sm">sobre</Link>
            <Link href="/" className="hover:opacity-75 duration-500 transition-all bg-[#e6a44e] px-2 py-1 rounded-sm">livraria</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
