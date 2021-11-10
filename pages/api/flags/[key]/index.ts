import type { NextApiRequest, NextApiResponse } from "next";
import { getFlag } from "lib/flags";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  const flag = await getFlag(key);
  res.status(200).json(flag);
};

export default handler;
