import type { Photo } from "@prisma/client";
const baseUrl = "/api/image";

export const postImage = async (image: { label: string; url: string }) => {
  const postRes = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(image),
  });
  const photo = (await postRes.json()) as Photo;
  return photo;
};

export const deleteImage = async (id: string) => {
  const deleteRes = await fetch(baseUrl, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const resObject = deleteRes.json();
  return resObject;
};
