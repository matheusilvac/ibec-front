import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"], // Defina os pesos que você precisa
});

export const Footer = () => {
  return (
    <footer className="bg-[#0A1A2D] text-white">
      <div className="mx-10 max-w-screen px-4 py-6 lg:py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        <div className="mb-8 md:mb-0 gap-2">
          <img
            src="/arvore-ibec.png"
            alt="Logo Entrada Certa"
            className=" h-16 object-fill mb-4"
          ></img>
          <p className={`text-sm md:text-md ${roboto.className}`}>
            “Se és teólogo, tu orarás de verdade, e se tu oras de verdade, tu
            serás teólogo”
            <br />- Evágrio
          </p>
        </div>
        <div className="mb-8 md:mb-0">
          <h2 className="font-semibold uppercase mb-4 text-2xl">Contribua</h2>
          <ul className={`text-sm md:text-md  ${roboto.className}`}>
            <li className="mb-2">
              Banco XXXX <br /> Agência: XXXX <br />
              C/C: XXXXX <br />
              Favorecido: Instituto Biblíco de Educação Cristã <br />
              CNPJ / PIX: XXXXXXXXXXXXXXXXXX
            </li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <h2 className=" font-semibold uppercase mb-4 text-2xl">Contato</h2>
          <ul className={`text-sm md:text-md  ${roboto.className}`}>
            <li className="mb-2">
              Estrada dos Orquidófilos, 386, Embu das Artes, São Paulo.
              <br />
              CEP 06833-380
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
