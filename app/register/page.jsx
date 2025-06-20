"use client";
import RegistrationForm from "../components/RegistrationForm";
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
      <RegistrationForm />
    </div>
  );
};

export default page;
