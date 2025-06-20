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
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ImageUploader from "@/app/components/ImageUploader";
import Loader from "@/app/components/ui/Loader";
import ShadowedCard from "@/app/components/ui/ShadowedCard";
import ConditionSelect from "@/app/components/ui/ConditionSelect";
import TagSelect from "@/app/components/ui/TagSelect";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Page = () => {
  const { userId } = useParams();
  const { imgFiles } = useFileUploadStore();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("PORK");
  const [tags, setTags] = useState([]);
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
        "https://dpdvqpbarkmryrbjtrer.supabase.co/storage/v1/object/public/images/item";

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
      };

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
    <div className="lg:p-8 p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-6">
        {/* Ad Details */}
        <ShadowedCard index={1} step="Ad details">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-xl lg:text-2xl font-semibold text-zinc-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Your title here..."
              className="w-full px-4 py-2 border border-zinc-400 text-zinc-600 bg-transparent"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <label
              htmlFor="description"
              className="text-xl lg:text-2xl font-semibold text-zinc-600"
            >
              Description
            </label>
            <TextareaAutosize
              aria-label="empty textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type your description here..."
              style={{ width: "100%", height: 100, border: ".5px solid #52525c", borderRadius: "4px", padding: "10px" }}
            />
          </div>
        </ShadowedCard>

        {/* Upload Images */}
        <ShadowedCard index={2} step="Upload images">
          <div className="flex flex-col gap-2">
            <label className="text-xl lg:text-2xl font-semibold text-zinc-600">
              Image
            </label>
            <ImageUploader ref={uploaderRef} />
          </div>
        </ShadowedCard>

        {/* Location */}
        {/* <ShadowedCard index={3} step="Set pickup/meetup location">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-[var(--color-base-content)]">
              <ProvinceSelect location={location} setLocation={setLocation} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
            <TextField
              label="City"
              variant="outlined"
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            />

            <div>
              <p className="text-xs mb-2">
                <ErrorOutlineIcon fontSize="inherit" /> Enhance location by entering a Postal Code
              </p>
              <TextField
                label="Postal code"
                variant="outlined"
                value={location.postal_code?.toUpperCase().trim()}
                onChange={(e) =>
                  setLocation({ ...location, postal_code: e.target.value })
                }
              />
            </div>
          </div>

          <GoogleMap location={location} />
        </ShadowedCard> */}

        {/* Contact information */}
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                <div className="flex items-center pb-3 gap-2">
                  <span className="bg-[var(--color-base-300)] text-xs rounded-sm px-2 py-1">
                    {3}
                  </span>
                  <span className="font-bold">Price</span>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col lg:flex-row  gap-4">
                <TextField
                  sx={{ width: "100%", flex: 1 }}
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  required
                />

                <FormGroup sx={{ flex: 1 }}>
                  <FormControlLabel required control={<Checkbox checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />} label="Is featured?" />
                </FormGroup>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Additional details */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ width: "100%" }}>
                <div className="flex items-center gap-2">
                  <span className="bg-[var(--color-base-300)] text-xs rounded-sm px-2 py-1">
                    {4}
                  </span>
                  <span className="font-bold">Additional Details</span>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col lg:flex-row items-end gap-4">
                <ConditionSelect
                  category={category}
                  setCategory={setCategory}
                />

                <div>
                  <p className="text-xs mb-1">
                    <ErrorOutlineIcon fontSize="inherit" /> Add up to 6 main ingredients.
                  </p>
                  <TagSelect tags={tags} setTags={setTags} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex justify-center mt-3 ml-auto px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-content)] text-[var(--color-primary-content)] hover:text-white rounded-sm w-full cursor-pointer"
        >
          {isLoading ? <Loader /> : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Page;
