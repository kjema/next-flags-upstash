import { NextApiRequest, NextApiResponse } from "next";
import { removeFlag } from "lib/flags";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  await removeFlag(key);
  res.status(200).json({ status: "ok" });
};

export default handler;
