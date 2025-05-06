import { AiOutlineLoading } from 'react-icons/ai';
import { FaTicketAlt } from 'react-icons/fa';
import {Loader} from "lucide-react";

interface LoadingProps {
  text: string;
}
export const Loading = () => {

  return (
    <div className="w-full flex justify-center items-center flex-col">
        <Loader className="animate-spin transition-all text-3xl"/>
        <p className="w-full flex justify-center text-md">Loading...</p>
    </div>
  );
}
