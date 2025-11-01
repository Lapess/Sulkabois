import { createClient } from "@/utils/supabase/client";

export default async function Users() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .throwOnError();

  return (
    <>
      <h1>Users</h1>
      {data.map((x) => x.name)}
      <p>Ville has left the building</p>
    </>
  );
}
