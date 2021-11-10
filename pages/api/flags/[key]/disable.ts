import { NextApiRequest, NextApiResponse } from "next";
import { disableFlag, getFlag } from "lib/flags";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  await disableFlag(key);
  const flag = await getFlag(key);
  res.status(200).json(flag);
};

export default handler;
