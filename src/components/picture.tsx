import type { Photo } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";

const Picture: FC<{ photo: Photo }> = ({ photo }) => {
  const { url, label } = photo;
  return (
    <div
      className={`relative ${
        true ? "row-span-2" : ""
      } overflow-auto rounded-xl shadow-lg shadow-slate-500`}
    >
      <Image
        src={url}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        alt={label}
        sizes="100%"
        priority={true}
      />
    </div>
  );
};

export default Picture;
