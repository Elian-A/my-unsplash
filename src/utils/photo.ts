import { prisma } from "../server/db";

export const getUserPhotos = async (userId: string) => {
  const photos = await prisma.photo.findMany({
    where: { userId },
    select: { label: true, url: true, id: true },
  });

  return photos;
};
