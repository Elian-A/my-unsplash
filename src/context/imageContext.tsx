import type { Photo } from "@prisma/client";
import type { FC, ReactElement } from "react";
import { createContext, useState } from "react";
interface ImageContext {
  photos: Photo[];
  addPhotos: (photo: Photo[]) => void;
  deletePhoto: (photo: Photo) => void;
}

export const ImageContext = createContext<ImageContext>({
  photos: [],
  addPhotos: () => null,
  deletePhoto: () => null,
});

export const ImageProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const addPhotos = (addedPhotos: Photo[]) =>
    setPhotos([...photos, ...addedPhotos]);
  const deletePhoto = (photo: Photo) =>
    setPhotos(photos.filter(({ id }) => id !== photo.id));
  const value = { photos, addPhotos, deletePhoto };
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
