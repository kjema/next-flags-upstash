import { Flag } from "lib/flags";
import { useFlags } from "lib/hooks/use-flag";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Flags: NextPage = () => {
  const { data: flag, error, mutate: reload } = useFlags();
  const [newFlag, setNewFlag] = useState("");

  if (error) return <div>failed to load</div>;

  if (!flag) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>Flags</title>
      </Head>
      <h1>Flags</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(`/api/flags/${newFlag}/enable`);
          reload();
          setNewFlag("");
        }}
      >
        <input
          type="text"
          required
          value={newFlag}
          onChange={({ target: { value } }) => setNewFlag(value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {Object.entries(flag).map(([key, value]) => (
          <li key={key}>
            {value ? (
              <button
                onClick={async () => {
                  await fetch(`/api/flags/${key}/disable`);
                  reload();
                }}
              >
                ✅
              </button>
            ) : (
              <button
                onClick={async () => {
                  await fetch(`/api/flags/${key}/enable`);
                  reload();
                }}
              >
                ⬜
              </button>
            )}
            <span>{key}</span>
            <button
              onClick={async () => {
                await fetch(`/api/flags/${key}/remove`);
                reload();
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Flags;
