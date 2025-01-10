import { ElementoWidget } from "@/components/elementoWidget";
import { FaBible, FaBook, FaChurch, FaCross } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col pt-32 pb-10 text-[#0A1A2D]">
      <div className="w-full h-full flex flex-col justify-center items-center mb-5 sm:mb-20 px-5 md:px-20">
        <div className="w-full h-full flex flex-col sm:flex-row justify-center md:justify-around items-center mb-10 sm:mb-14 px-0 sm:px-5">
          <div className="w-full h-full sm:w-2/3 justify-center items-center flex text-start mb-5 sm:mb-0">
            <h1 className="text-4xl md:text-6xl text-center sm:text-left uppercase font-semibold ">
              Instítuto Bíblico<br /> de <br /> Educação Cristã
            </h1>
          </div>
          <div className="w-full h-full sm:w-1/2 flex justify-center items-center">
            <p className="text-center sm:text-left text-lg sm:text-xl">
              <strong className="text-xl sm:text-3xl bg-[#ffcc89]">
                Mateus 7:17-20
              </strong>
              , que enfatiza que uma{" "}
              <strong className="bg-[#ffcc89]">“árvore boa”</strong> é
              reconhecida pelos frutos que produz. Esse conceito simboliza
              diretamente o objetivo do instituto: formar líderes comprometidos
              com a verdadeira palavra de Deus e que sejam capazes de gerar bons
              frutos no seu ministério.
              <br />
              <br />O conceito de{" "}
              <strong className="bg-[#ffcc89]">“bons frutos”</strong> reforça a
              missão do IBEC de educar as pessoas sobre a verdadeira palavra de
              Deus e corrigir as deficiências na formação ministerial. Cada
              fruto gerado representa um líder bem preparado e uma comunidade
              transformada.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-full">
          <img
            src="/arvores.png"
            alt=""
            className="w-full sm:w-1/2 h-auto flex"
          />
        </div>
      </div>
        <div className="w-full h-full flex flex-col sm:flex-row justify-center sm:justify-around items-center mb-10 px-5 md:px-20">
          <div className="w-full flex flex-col justify-center items-center gap-3 mb-5">
            <h1 className="text-3xl font-semibold uppercase justify-center sm:justify-start flex w-full">
              Proposta
            </h1>
            <p className="flex justify-center items-center text-center sm:text-left text-lg">
              O projeto do IBEC – Instituto Bíblico de Educação Cristã – foi
              idealizado há cerca de quatro anos, com uma visão clara e um
              propósito profundo.
              <br /> Embora haja uma variedade de cursos teológicos disponíveis
              no mercado, os fundadores do IBEC perceberam que muitos desses
              seminários se concentram exclusivamente na transmissão de
              conhecimento acadêmico, sem considerar a formação para o exercício
              do ministério. <br />A proposta do IBEC é ir além do ensino
              teológico tradicional: o objetivo é oferecer uma formação que ira
              forjar, de maneira sólida, homens piedosos, que temem a Deus e
              buscam viver sua fé de forma autêntica e prática.
              <br />A missão do IBEC é formar homens que, ao se aprofundarem na
              teologia, reconheçam sua total dependência de Deus e, a partir
              disso, sejam capacitados a servir à Igreja de Cristo com eficácia
              e integridade. A teologia ensinada no IBEC visa à construção de um
              caráter transformado, refletindo os valores do Reino de Deus nas
              ações e atitudes cotidianas.
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-3/4 h-auto flex flex-wrap justify-center items-center gap-8 bg-[#0A1A2D] rounded-xl p-5">
              <section className="max-w-[200px] h-auto flex justify-around items-center gap-3">
                <div className="w-20 h-20 justify-center rounded-xl bg-[#e6a44e] flex shadow-md shadow-black/25">
                  <FaChurch className="w-2/3 h-auto" />
                </div>
                <p className="text-white flex text-left w-24 text-sm">
                  Curso aceito em todas as igrejas evangélicas
                </p>
              </section>
              <section className="max-w-[200px] h-auto flex justify-around items-center gap-3">
                <div className="w-20 h-20 justify-center rounded-xl bg-[#e6a44e] flex shadow-md shadow-black/25">
                  <PiCertificateFill className="w-2/3 h-auto" />
                </div>
                <p className="text-white flex text-left w-24 text-sm">
                  Certificado com carga horária de 2.400h aulas
                </p>
              </section>
              <section className="max-w-[200px] h-auto flex justify-around items-center gap-3">
                <div className="w-20 h-20 justify-center rounded-xl bg-[#e6a44e] flex shadow-md shadow-black/25">
                  <FaBook className="w-2/3 h-auto" />
                </div>
                <p className="text-white flex text-left w-24 text-sm">
                  Grade de aulas completa, novo e velho testamento
                </p>
              </section>
              <section className="max-w-[200px] h-auto flex justify-around items-center gap-3">
                <div className="w-20 h-20 justify-center rounded-xl bg-[#e6a44e] flex shadow-md shadow-black/25">
                  <FaBook className="w-2/3 h-auto" />
                </div>
                <p className="text-white flex text-left w-24 text-sm">
                  Livraria completa
                </p>
              </section>
            </div>
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
