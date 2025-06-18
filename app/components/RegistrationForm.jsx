"use client";
import React, { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "../../lib/utils";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, X } from "lucide-react";
// import { registerInputSchema } from "../utils/registerInputSchema";
import Loader from "./ui/Loader";
import axios from "axios";

const supabase = createClient();

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!-\/:-@[-`{-~]/, text: "At least 1 special characters" },
];

const STRENGTH_CONFIG = {
  colors: {
    0: "bg-border",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-amber-500",
    4: "bg-amber-700",
    5: "bg-emerald-500",
  },
  text_color: {
    0: "bg-border",
    1: "text-red-500",
    2: "text-orange-500",
    3: "text-amber-500",
    4: "text-amber-700",
    5: "text-emerald-500",
  },
  texts: {
    0: "",
    1: "Weak password",
    2: "Medium password!",
    3: "Strong password!!",
    4: "Very Strong password!!!",
  },
};

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    confirmPassword: "",
    avatar: "",
  });
  const router = useRouter();

  const calculateStrength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
    return {
      score: requirements.filter((req) => req.met).length,
      requirements,
    };
  }, [password]);

  // SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //make sure name and email are not empty
    if (formData.name === "" || formData.email === "") {
      setError(["Display name or email cannot be empty"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure password is not empty
    if (/\s/.test(formData.password)) {
      setError(["Password cannot have spaces"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure password meets all requirements
    if (calculateStrength.score !== 5) {
      setError(["Password must meet all criteria below"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(["Passwords do not match"]);
      setLoading(false);
      return; // prevent form submission
    }

    try {
      // remove confirmPassword from data to send and for input validation
      const { confirmPassword, ...dataToSend } = formData;

      // zod validation
      //   const validationResult = registerInputSchema.safeParse(dataToSend);
      //   if (!validationResult.success) {
      //     formData.password = "";
      //     formData.confirmPassword = "";
      //     setError(validationResult.error.errors);
      //     setLoading(false);
      //     return;
      //   }

      // send data to server
      let uploadedAvatarURL = "";
      const defaultAvatar =
        "https://crtvgenbjflrgxtjpdwz.supabase.co/storage/v1/object/public/avatars//default-avatar.png";

      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `avatars/${formData.email}-${Date.now()}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);

        if (uploadError) {
          setError(["Failed to upload avatar. Try again."]);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        uploadedAvatarURL = publicUrlData.publicUrl;
      }

      const response = await axios.post("/api/register", {
        ...dataToSend,
        avatar: uploadedAvatarURL === "" ? defaultAvatar : uploadedAvatarURL,
      });

      // redirect to success page if registration is successful
      if (response) {
        router.push("/registration-success");
      }
    } catch (error) {
      console.error({ error });

      // display error if user with email already exists
      if (error.status === 400) {
        setError(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // INPUT HANDLER
  async function handleInputChange(e) {
    const { name, value } = e.target;
    try {
      if (name === "avatar" && e.target.files.length > 0) {
        setAvatarFile(e.target.files[0]);
        return;
      }

      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          [name]: name === "email" ? value.toLowerCase().trim() : value.trim(),
        };

        if (updatedFormData.password !== updatedFormData.confirmPassword) {
          setError("Passwords do not match");
        } else {
          setError(null);
        }

        if (name === "password") {
          setPassword(value);
        }

        return updatedFormData;
      });
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <div className="min-h-fit max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[var(--color-base-100)] shadow-lg mt-2">
      <h2 className="text-center font-bold text-xl text-[var(--color-base-content)]">
        <span className="text-[var(--color-primary-content)] text-3xl tracking-tighter">
          NadaMart.
        </span>
        <span className="text-[var(--color-primary-content)] text-md font-thin">
          ca
        </span>
      </h2>
      <p className="text-sm mt-2 text-[var(--color-base-content)] text-center">
        Nothing for sale, everything for free!
      </p>
      <br />
      <form className="my-2" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Display Name</Label>
            <Input
              onChange={handleInputChange}
              value={formData.name}
              id="name"
              placeholder="Your name"
              type="text"
              name="name"
              className="text-[var(--color-base-content)] bg-[var(--color-base-200)] focus-within:border-[var(--color-primary-content)] transition"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              onChange={handleInputChange}
              id="avatar"
              placeholder="Upload image"
              type="file"
              name="avatar"
              className="text-[var(--color-base-content)] bg-[var(--color-base-200)] focus-within:border-[var(--color-primary-content)] transition"
            />
          </LabelInputContainer>
        </div>

        <div className="flex flex-col md:flex-row gap-1 items-center">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={handleInputChange}
              value={formData.email}
              id="email"
              placeholder="user@domain.com"
              type="email"
              name="email"
              className="text-[var(--color-base-content)] bg-[var(--color-base-200)] focus-within:border-[var(--color-primary-content)] transition"
            />
          </LabelInputContainer>
        </div>

        <div className="w-full mx-auto mb-4">
          <label
            htmlFor="password"
            className="text-[var(--color-base-content)] block text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby="password-strength"
              className="w-full p-2 hover:border-2 rounded-md border border-[var(--color-base-300)] bg-[var(--color-base-200)] focus-within:border-[var(--color-primary-content)] transition"
            />
            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-9 text-muted-foreground/80 "
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <label
            htmlFor="confirmPassword"
            className="text-[var(--color-base-content)] block text-sm font-medium mt-4 mb-1"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby="password-strength"
              className="w-full p-2 hover:border-2 rounded-md border border-[var(--color-base-300)] bg-[var(--color-base-200)] focus-within:border-[#525252] transition"
            />
          </div>

          {/* PASSWORD MATCH ERROR */}
          {Array.isArray(error) &&
            error.length !== 0 &&
            error.map((err, index) => (
              <p key={index} className="text-red-500 italic text-sm">
                {err.message || err}
              </p>
            ))}

          <div
            className="mt-3 mb-2 h-1 rounded-full bg-border overflow-hidden"
            role="progressbar"
            aria-valuenow={calculateStrength.score}
            aria-valuemin={0}
            aria-valuemax={4}
          >
            <div
              className={`h-full ${
                STRENGTH_CONFIG.colors[calculateStrength.score]
              } transition-all duration-500`}
              style={{ width: `${(calculateStrength.score / 5) * 100}%` }}
            />
          </div>

          <p
            id="password-strength"
            className="mb-2 text-sm font-medium flex justify-between"
          >
            <span>Password must contain:</span>
            <span
              className={`${
                STRENGTH_CONFIG.text_color[calculateStrength.score]
              } transition-all duration-500`}
            >
              {STRENGTH_CONFIG.texts[Math.min(calculateStrength.score, 4)]}
            </span>
          </p>

          <ul className="space-y-1.5" aria-label="Password requirements">
            {calculateStrength.requirements.map((req, index) => (
              <li key={index} className="flex items-center space-x-2">
                {req.met ? (
                  <Check size={16} className="text-emerald-500" />
                ) : (
                  <X size={16} className="text-muted-foreground/80" />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="flex justify-center items-center bg-gradient-to-br relative group/btn bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary-content)] hover:text-[#fff] w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
          type="submit"
        >
          {loading ? <Loader /> : "Sign up"}
          <BottomGradient />
        </button>
        <p className="text-red-500 italic">{error}</p>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex items-center justify-start space-x-2 w-full px-4 h-10 rounded-md font-medium shadow-input bg-[var(--color-primary)] hover:bg-[var(--color-primary-content)] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
            type="submit"
          >
            <IconBrandFacebook className="h-4 w-4 text-[var(--color-primary-content)] group-hover/btn:text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--color-primary-content)] group-hover/btn:text-[#fff]">
              Facebook
            </span>
            <BottomGradient />
          </button>
          <button
            type="submit"
            className="relative group/btn flex items-center justify-start space-x-2 w-full px-4 h-10 rounded-md font-medium shadow-input bg-[var(--color-primary)] hover:bg-[var(--color-primary-content)] dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
            aria-label="Sign in with Google"
          >
            <IconBrandGoogle className="h-4 w-4 text-[var(--color-primary-content)] group-hover/btn:text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--color-primary-content)] group-hover/btn:text-[#fff]">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegistrationForm;
