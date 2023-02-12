import Image from "next/image";
import type { FC } from "react";
import type { Photo } from "../pages";

const Picture: FC<{ photo: Photo }> = ({ photo }) => {
  const { title, url } = photo;
  const large = photo.large ? photo.large : false;
  return (
    <div
      className={`relative ${
        large ? "row-span-2" : ""
      } overflow-auto rounded-xl shadow-lg shadow-slate-500`}
    >
      <Image
        src={url}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        alt={title}
      />
    </div>
  );
};

export default Picture;
