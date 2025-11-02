import { createClient } from "@/utils/supabase/client";

export default async function Players() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .throwOnError();

  return (
    <>
      <h1>Pelaajat</h1>
      {data.map((x) => x.name)}
      <p>Error: {error}</p>
    </>
  );
}
