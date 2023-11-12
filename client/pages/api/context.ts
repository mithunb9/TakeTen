import { complete } from "@/openai";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // call openai api
  const prompt = req.body.prompt;
  complete(prompt).then((response) => {
    res.status(200).json(response);
  });
}
