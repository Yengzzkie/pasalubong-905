"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fireConfetti } from "../components/ui/Confetti";
import { useSession } from "next-auth/react";

const RegistrationSuccess = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    fireConfetti();
    const timer = setTimeout(() => {
      router.push("/login");
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      <div className="flex items-center justify-center h-screen bg-[var(--background)]">
        <div className="h-full text-center bg-[var(--background)] rounded-lg px-2 lg:px-44 py-10">
          <CheckCircleIcon className="text-green-500 w-32 mx-auto my-8" />
          <h1 className="text-2xl font-bold text-white">
            🎉 Registration Successful!
          </h1>
          <p className="text-[var(--color-base-content)] mt-4">
            Thank you for signing up! A verification link has been sent to your
            email. Please verify your account to unlock the full features of
            NadaMart.
          </p>
          <p className="text-[var(--color-base-content)] mt-4 text-sm italic">
            You will be redirected to the login page shortly.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:text-[var(--color-primary)] rounded hover:bg-[var(--color-primary-content)] cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccess;