import { AiOutlineLoading } from 'react-icons/ai';
import { FaTicketAlt } from 'react-icons/fa'; 

interface LoadingProps {
  text: string;
}
export const Loading = ({ text } : LoadingProps) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
      <div className='flex flex-col justify-center items-center'>
      <FaTicketAlt className='text-[#0f66ae] animate-bounce' size={22} />
        <AiOutlineLoading className='text-gray-700 animate-spin' size={24}/>
        <h1 className="text-gray-700 font-semibold text-sm flex">{text || 'Processando...'}</h1>
      </div>
    </div>
  );
}
