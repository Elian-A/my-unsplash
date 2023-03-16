import type { NextApiRequest, NextApiResponse } from "next";
import { addFormValidator } from "../../components/addModal";
import { getServerAuthSession } from "../../server/auth";
import { prisma } from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).send({
      code: 401,
      message: "Unauthorized",
    });
    return;
  }

  if (req.method === "POST") {
    const validatedData = addFormValidator.safeParse(req.body);
    if (!validatedData.success) {
      res.status(400).send({
        code: 400,
        message: validatedData.error.errors.map((errs) => errs.message),
      });
      return;
    }

    const data = { ...validatedData.data, userId: session.user.id };
    const { label, url, createdAt, updatedAt, id } = await prisma.photo.create({
      data,
    });

    res.status(201).send({ label, url, createdAt, updatedAt, id });
    return;
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    console.log(req.body);

    if (!id)
      return res.status(400).json({ code: 400, message: "No image id found" });
    await prisma.photo.delete({ where: { id } });

    res.status(200).json({ code: 200, message: "Image deleted successfully" });
    return;
  }
  res.status(403).send({ code: 400, message: "Invalid method" });
}
