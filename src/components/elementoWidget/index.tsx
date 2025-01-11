import { ReactElement } from "react";

type elementos = {
    svg: ReactElement;
    titulo: string;
    descricao: string;
}

export const ElementoWidget = ({svg, titulo, descricao}: elementos) => {
  return (
    <div className="w-[250px] h-[350px] flex-col justify-center items-center p-5 mb-5">
      <div className="w-full flex justify-center items-center mb-2">
        <div className="w-44 h-44 flex justify-center items-center rounded-full border-[3px] border-[#0A1A2D] p-10">
            {svg}
        </div>
      </div>
      <div className="w-full flex justify-center mb-2">
        <h1 className="text-lg uppercase flex font-bold">{titulo}</h1>
      </div>
      <div className="w-full flex justify-center">
        <p className="text-sm uppercase text-center flex justify-center">{descricao}</p>
      </div>
    </div>
  );
};
