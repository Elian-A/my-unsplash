import type { Photo } from "@prisma/client";
import type { FC, ReactElement } from "react";
import { createContext, useState } from "react";
interface ImageContext {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  deletePhoto: (photo: Photo) => void;
}

export const ImageContext = createContext<ImageContext>({
  photos: [],
  addPhoto: () => null,
  deletePhoto: () => null,
});

export const ImageProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const addPhoto = (photo: Photo) => {
    setPhotos([...photos, photo]);
  };
  const deletePhoto = (photo: Photo) => {
    setPhotos(photos.filter(({ id }) => id !== photo.id));
  };
  const value = { photos, addPhoto, deletePhoto };
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
