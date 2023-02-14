import { useContext } from "react";
import type { FC } from "react";
import { searchContext } from "../context/search";
import type { Photo } from "@prisma/client";
import Picture from "./picture";

const Photos: FC<{ photos: Photo[] }> = ({ photos }) => {
  const { searchText } = useContext(searchContext);
  const filteredPhotos = photos.filter((photo) =>
    photo.label.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="grid-wrapper gap-7">
      {searchText === ""
        ? photos.map((photo) => <Picture key={photo.id} photo={photo} />)
        : filteredPhotos.map((photo) => (
            <Picture key={photo.id} photo={photo} />
          ))}
    </div>
  );
};
export default Photos;
