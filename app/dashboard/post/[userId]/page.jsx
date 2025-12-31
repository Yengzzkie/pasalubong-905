"use client";
import { useRef, useState } from "react";
import { useFileUploadStore } from "@/stores/store";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ImageUploader from "@/app/components/ImageUploader";
import Loader from "@/app/components/ui/Loader";
import ShadowedCard from "@/app/components/ui/ShadowedCard";
import ConditionSelect from "@/app/components/ui/ConditionSelect";
import TagSelect from "@/app/components/ui/TagSelect";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Page = () => {
  const { userId } = useParams();
  const { imgFiles } = useFileUploadStore();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("PORK");
  const [tags, setTags] = useState([]);
  const [isOtherProduct, setIsOtherProduct] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const uploaderRef = useRef(null);

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseUrl =
        "https://tkwdscmedenodouotzeh.supabase.co/storage/v1/object/public/images/item";

      const fullUrls = imgFiles.map((file) => {
        const fileName = typeof file === "string" ? file : file.name;
        return `${baseUrl}/${fileName}`;
      });

      const formData = {
        userId,
        item_name: itemName,
        description,
        price: parseFloat(price),
        isFeatured,
        image: fullUrls,
        category,
        tags,
        isOtherProduct,
      };

      console.log(formData);

      await axios.post("/api/posts", formData);
      await uploaderRef.current?.onUpload();

      setIsSuccess(true);
      setTimeout(() => redirect("/"), 2000);
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setIsLoading(false);
      setItemName("");
      setDescription("");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 h-[75vh]">
        <CheckBadgeIcon className="text-green-500 w-12 h-12" />
        <p className="text-[var(--color-base-content)]">
          Ad posted successfully!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Details */}
        <ShadowedCard index={1} step="Item details">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-zinc-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Item name"
                className="w-full px-3 py-2 border border-zinc-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-medium text-zinc-700"
              >
                Description
              </label>
              <TextareaAutosize
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Item description"
                minRows={4}
                className="w-full px-3 py-2 border border-zinc-300 rounded shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </ShadowedCard>

        {/* Image Upload */}
        <ShadowedCard index={2} step="Upload image">
          <div className="space-y-2">
            <label className="block font-medium text-zinc-700">Images</label>
            <ImageUploader ref={uploaderRef} />
          </div>
        </ShadowedCard>

        {/* Price and Featured */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex items-center gap-2 font-medium text-zinc-700">
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                {3}
              </span>
              <span>Price</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col lg:flex-row gap-4">
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
              />
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Additional Details */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex items-center gap-2 font-medium text-zinc-700">
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                {4}
              </span>
              <span>Additional Details</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-4">
              <ConditionSelect category={category} setCategory={setCategory} />
              <div className="flex-1">
                <p className="text-xs text-zinc-500 mb-1">
                  <ErrorOutlineIcon fontSize="small" className="mr-1" />
                  Add up to 6 main ingredients.
                </p>
                <TagSelect tags={tags} setTags={setTags} />
              </div>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                  }
                  label="Feature this item"
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOtherProduct}
                      onChange={(e) => setIsOtherProduct(e.target.checked)}
                    />
                  }
                  label="Is other product?"
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
                />
              </FormGroup>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isLoading ? <Loader /> : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
