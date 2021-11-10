import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFlag = (key: string) => {
  const { data } = useSWR(`flags/${key}`);
  return !!data;
};

export const useFlags = () => {
  return useSWR(`flags`);
};
