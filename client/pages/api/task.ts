import { NextApiRequest, NextApiResponse } from "next";
import { task } from "../../openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const taskName = req.query.name;

  if (req.method === "GET") {
    const data = await task(taskName);

    console.log(data);

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Only GET requests allowed" });
  }
}
