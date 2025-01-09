import { EilementoWidget } from "@/components/elementoWidget";
import { Loading } from "@/components/loading";
import Image from "next/image";
import { FaBible } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col pt-32 pb-10 text-[#0A1A2D]">
      <div className="w-full flex justify-start items-center flex-col gap-2">
        <h1 className="text-6xl uppercase font-semibold">fazendo teologia de joelhos</h1>
        <p>Assim, toda árvore boa produz bons frutos, e toda árvore má produz frutos maus</p>
      </div>
      <div  className="w-full h-full flex flex-wrap justify-center items-center gap-8">
        <EilementoWidget svg={<FaBible className="w-full h-full"/>} titulo="Bíblico" descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."/>
        <EilementoWidget svg={<FaBible className="w-full h-full"/>} titulo="Bíblico" descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."/>
        <EilementoWidget svg={<FaBible className="w-full h-full"/>} titulo="Bíblico" descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."/>
        <EilementoWidget svg={<FaBible className="w-full h-full"/>} titulo="Bíblico" descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."/>
        <EilementoWidget svg={<FaBible className="w-full h-full"/>} titulo="Bíblico" descricao="Cremos que a Sagrada Escritura é verdadeiramente a Palavra de Deus e, portanto, inerrante, infalível e única regra de fé e prática para o cristão."/>
      </div>
    </div>
  );
}
