import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-center bg-[#0A1A2D] fixed top-0 z-50 left-0 text-white">
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
          <ul className="w-full flex justify-center gap-2 md:gap-8 uppercase text-sm md:text-md">
            <Link href="/" className="hover:text-white/70 duration-500 transition-all hover:bg-[#e6a44e]/80 bg-[#e6a44e] px-2 py-2 rounded-md">inicio</Link>
            <Link href="/" className="hover:text-white/70 duration-500 transition-all hover:bg-[#e6a44e]/80 bg-[#e6a44e] px-2 py-2 rounded-md">curso</Link>
            <Link href="/" className="hover:text-white/70 duration-500 transition-all hover:bg-[#e6a44e]/80 bg-[#e6a44e] px-2 py-2 rounded-md">sobre</Link>
            <Link href="/" className="hover:text-white/70 duration-500 transition-all hover:bg-[#e6a44e]/80 bg-[#e6a44e] px-2 py-2 rounded-md">livraria</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
