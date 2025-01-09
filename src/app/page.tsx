import { ElementoWidget } from "@/components/elementoWidget";
import { Loading } from "@/components/loading";
import Image from "next/image";
import { FaBible, FaChurch, FaCross } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col pt-32 pb-10 text-[#0A1A2D]">
      <div className="w-full h-full flex flex-col justify-center items-center mb-20 px-5 md:px-20">
        <div className="w-full h-full flex flex-col sm:flex-row justify-center md:justify-around items-center mb-10 sm:mb-14 px-0 sm:px-5">
          <div className="w-full h-full sm:w-1/2 justify-center items-center flex text-start mb-5 sm:mb-0">
            <h1 className="text-4xl md:text-7xl text-center sm:text-left uppercase font-semibold">
              Instítuto Bíblico de <br /> Educação Cristã
            </h1>
          </div>
          <div className="w-full h-full sm:w-1/2 flex justify-center items-center">
            <p className="text-center sm:text-left text-lg sm:text-xl">
              <strong className="text-xl sm:text-3xl bg-[#e6a44e]">
                Mateus 7:17-20
              </strong>
              , que enfatiza que uma{" "}
              <strong className="bg-[#e6a44e]">“árvore boa”</strong> é
              reconhecida pelos frutos que produz. Esse conceito simboliza
              diretamente o objetivo do instituto: formar líderes comprometidos
              com a verdadeira palavra de Deus e que sejam capazes de gerar bons
              frutos no seu ministério.
              <br />
              <br />O conceito de{" "}
              <strong className="bg-[#e6a44e]">“bons frutos”</strong> reforça
              a missão do IBEC de educar as pessoas sobre a verdadeira palavra
              de Deus e corrigir as deficiências na formação ministerial. Cada
              fruto gerado representa um líder bem preparado e uma comunidade
              transformada.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-full">
          <img src="/arvores.png" alt="" className="w-full sm:w-1/2 h-auto flex" />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-8">
        <ElementoWidget
          svg={<FaBible className="w-full h-full" />}
          titulo="Bíblico"
          descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."
        />
        <ElementoWidget
          svg={<FaChurch className="w-full h-full" />}
          titulo="Pastoral"
          descricao="Existimos para servir a Igreja formando líderes que sejam capazes de expor fielmente a Palavra de Deus e conduzir Seu rebanho pelos verdejantes pastos da graça de Cristo."
        />
        <ElementoWidget
          svg={<FaCross className="w-full h-full" />}
          titulo="Espiritual"
          descricao="Ensinamos teologia com o rigor que lhe é devido, sem, contudo, desmerecer seu mais alto fim: crescer em maturidade e no amar a Cristo e sua Igreja."
        />
      </div>
    </div>
  );
}
