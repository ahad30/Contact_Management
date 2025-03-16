
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import Link from "next/link";
import { useContext } from "react";
import { FaBackward, FaPlus } from "react-icons/fa";
const ButtonWithModal = ({
  title,
  path,
  back
}) => {
 

  // Get the translated title based on the current language





  const dispatch = useAppDispatch();
  return path ? (
    <Link href={`${path}`}>
      <button className="bg-[#24354C] flex justify-center items-center gap-2  text-center text-white w-full px-2 lg:px-0 py-2 lg:py-0 lg:w-[200px] lg:h-[45px] rounded-md">
        
      {
     back ? (
    <>
      <FaBackward /> {title}
    </>
  ) : (
    <>
      <FaPlus /> {title}
    </>
  )
}

      </button>
    </Link>
  ) : (
    <button
      onClick={() => dispatch(setIsAddModalOpen())}
      className="bg-[#24354C] flex justify-center  items-center gap-2  text-center text-white w-full px-2 lg:px-0 py-2 lg:py-0 lg:w-[200px] lg:h-[45px] rounded-md"
    >
      <FaPlus /> {title}
    </button>
  );
};

export default ButtonWithModal;
