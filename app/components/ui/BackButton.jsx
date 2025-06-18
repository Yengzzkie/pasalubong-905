import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const BackButton = () => {
  const router = useRouter();
  // This component renders a button that navigates back to the previous page
  return (
    <Button
      onClick={() => router.back()}
      variant="contained"
      sx={{ bgcolor: "var(--color-primary)", color: "var(--color-primary-content)", width: "fit-content", marginBottom: ".5rem", marginLeft: ".25rem" }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
