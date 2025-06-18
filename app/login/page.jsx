"use client"
import LoginForm from "../components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null;
  }
  
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
