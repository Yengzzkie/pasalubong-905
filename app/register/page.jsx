"use client";
import dynamic from "next/dynamic";

const RegistrationForm = dynamic(() => import("../components/RegistrationForm"), {
  ssr: false,
});

const page = () => {

  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default page;
