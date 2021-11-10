import type { NextApiRequest, NextApiResponse } from "next";
import { getFlags } from "lib/flags";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const flags = await getFlags();
  res.status(200).json(flags);
};

export default handler;
