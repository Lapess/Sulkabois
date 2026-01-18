import LoginForm from "@/components/forms/auth/LoginForm";
import { getUser } from "@/services/supabase/auth/user";
import { redirect } from "next/navigation";

async function Login() {
  const user = await getUser();
  if (user) redirect("/");

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
