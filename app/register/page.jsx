"use client";
import RegistrationForm from "../components/RegistrationForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RegistrationForm = dynamic(() => import("@/components/RegistrationForm"), {
  ssr: false,
});

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
