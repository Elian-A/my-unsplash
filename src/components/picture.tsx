import type { Photo } from "@prisma/client";
import Image from "next/image";
import { useContext } from "react";
import type { FC } from "react";
import { ModalContext } from "../context/modalContext";

const Picture: FC<{ photo: Photo }> = ({ photo }) => {
  const { url, label } = photo;
  const { toggleModalView, setType } = useContext(ModalContext);
  const isLarge = Math.random() > 0.5;
  const handleDelete = () => {
    setType("delete");
    toggleModalView(true);
  };
  return (
    <div
      className={`group relative max-w-sm cursor-pointer overflow-auto rounded-xl shadow-lg shadow-slate-500  hover:scale-110 hover:rounded-2xl ${
        isLarge ? "row-span-2" : ""
      } flex flex-col`}
    >
      <Image
        src={url}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        alt={label}
        sizes="100%"
        className="group-hover:brightness-75"
        priority={true}
      />
      <div className="relative z-10 mt-4 mr-4 self-end">
        {/* I dont know why next-font isn't working,
         fw-500 is not accesible even when is especified in _app  */}
        <button
          onClick={handleDelete}
          className="rounded-3xl border-2 border-secondary-400 py-1 px-5 font-accent text-sm text-secondary-400 contrast-125 hover:scale-110 hover:contrast-200"
        >
          delete
        </button>
      </div>
      <h3 className="relative z-10 mt-auto cursor-default break-words px-6 pb-6 font-sans text-xl font-bold text-white">
        {label}
      </h3>
    </div>
  );
};

export default Picture;
