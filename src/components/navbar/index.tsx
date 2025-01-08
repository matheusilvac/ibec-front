import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="w-full h-24 flex justify-center bg-[#0A1A2D]">
      <div className="w-full flex justify-between px-10 items-center">
        <div>
          <Link href="/">
            <img
              src="/logo_ibec.png"
              alt="Logo Entrada Certa"
              className="h-14 md:h-20 object-fill"
            ></img>
          </Link>
        </div>
        <div className=" h-full flex justify-center items-center">
          <ul className="w-full flex justify-center gap-2 md:gap-8 uppercase text-sm md:text-md">
            <Link href="/">inicio</Link>
            <Link href="/">curso</Link>
            <Link href="/">sobre</Link>
            <Link href="/">livraria</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
