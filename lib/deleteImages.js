import { createClient } from "@/lib/supabase/client";

export const deleteImages = async (imageUrls) => {
  const supabase = createClient();

  try {
    const filePaths = imageUrls
      .map((url) => {
        const parts = url.split("/storage/v1/object/public/");
        return parts[1] || null; // returns "images/userId/filename.jpg"
      })
      .filter(Boolean)
      .map((fullPath) => {
        // Remove bucket name prefix to get just "userId/filename.jpg"
        return fullPath.replace("images/", "");
      });

    const { error } = await supabase.storage
      .from("images") // bucket name only
      .remove(filePaths);

    if (error) {
      console.error("Failed to delete images:", error.message);
      throw new Error("Image deletion failed");
    }

  } catch (err) {
    console.error("Error during image deletion:", err.message);
    throw err; // Optional: rethrow or handle upstream
  }
};
