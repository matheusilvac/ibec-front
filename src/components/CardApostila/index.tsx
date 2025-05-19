import {useApostila} from "@/context/ApostilaContext/ApostilasContext";
import Link from "next/link";

export const CardApostila = () => {
    const { apostila, setApostila } = useApostila();

    return (
        <>
            {apostila?.map((apostila) => (
                <Link href="" key={apostila.id} className="w-[180px] h-[270px] flex flex-col items-center rounded-xl hover:shadow-xl shadow-black transition-all duration-300 cursor-pointer hover:scale-105">
                    <img src={apostila.imagem} className="w-full flex justify-center items-center h-full rounded-xl"/>
                </Link>
            ))}
        </>
    )
}