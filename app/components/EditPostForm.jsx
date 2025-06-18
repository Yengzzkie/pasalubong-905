"use client";

import { useRef, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
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
import GoogleMap from "@/app/components/GoogleMap";
import ConditionSelect from "@/app/components/ui/ConditionSelect";
import TagSelect from "@/app/components/ui/TagSelect";
import ProvinceSelect from "./ui/ProvinceSelect";

const EditPostForm = ({ postData, setIsEditMode, fetchPostDetails }) => {
  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState({
    city: "",
    province: "",
    country: "Canada",
    postal_code: "",
  });
  const [contactNumber, setContactNumber] = useState("");
  const [condition, setCondition] = useState("NEW");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uploaderRef = useRef(null);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setLocation(
        postData.location || { city: "", province: "", country: "Canada", postal_code: "" }
      );
      setContactNumber(postData.contact_number || "");
      setCondition(postData.condition || "NEW");
      setTags(postData.tags || []);
    }
  }, [postData]);

  // redirect user to login page if user is not logged in
  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = {
        title,
        content,
        location,
        contact_number: contactNumber,
        condition,
        tags,
      };
  
      await axios.put(`/api/posts/post?postId=${postData.id}`, formData);
  
      fetchPostDetails();
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:p-8 p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-6">
        {/* Ad Details */}
        <ShadowedCard index={1} step="Ad details">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-lg lg:text-2xl font-semibold text-zinc-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your title here..."
              className="w-full px-4 py-2 border border-zinc-300 text-zinc-600 bg-transparent"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <label
              htmlFor="description"
              className="text-lg lg:text-2xl font-semibold text-zinc-600"
            >
              Description
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full border px-3 py-2 rounded"
              placeholder="Type your description here..."
            />
          </div>
        </ShadowedCard>

        {/* Upload Images */}
        <p className="text-xs italic text-red-500">Image cannot be changed</p>
        <div className="opacity-50 pointer-events-none">
          <ShadowedCard index={2} step="Upload images">
            <div className="flex flex-col gap-2">
              <label className="text-lg lg:text-2xl font-semibold text-zinc-600">
                Images
              </label>
              <ImageUploader ref={uploaderRef} />
            </div>
          </ShadowedCard>
        </div>

        {/* Location */}
        <ShadowedCard index={3} step="Set pickup/meetup location">
          <h1 className="font-bold text-[var(--color-base-content)] text-lg lg:text-xl mt-2 mb-4">
            Location
          </h1>
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
              required
            />

            <div>
              <p className="text-xs mb-2">
                <ErrorOutlineIcon fontSize="inherit" /> Enhance location by
                entering a Postal Code
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
        </ShadowedCard>

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
                    {4}
                  </span>
                  <span className="font-bold">Contact Information</span>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
                <TextField
                  sx={{ width: "100%" }}
                  label="Mobile Number (Optional)"
                  variant="outlined"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
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
                    {5}
                  </span>
                  <span className="font-bold">Additional Details</span>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col lg:flex-row items-end gap-4">
                <ConditionSelect
                  condition={condition}
                  setCondition={setCondition}
                />

                <div>
                  <p className="text-xs mb-1">
                    <ErrorOutlineIcon fontSize="inherit" /> Add up to 6 relevant
                    tags to boost your ad&apos;s visibility.
                  </p>
                  <TagSelect tags={tags} setTags={setTags} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Save/cancel button */}
        <div className="flex flex-col lg:flex-row lg:gap-2 gap-.5">
          <button
            type="submit"
            className="flex justify-center mt-3 ml-auto px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-content)] text-[var(--color-primary-content)] hover:text-white rounded-sm w-full cursor-pointer"
          >
            {isLoading ? <Loader /> : "Save"}
          </button>

          <button
            type="button"
            onClick={() => setIsEditMode(false)}
            className="flex justify-center mt-3 ml-auto px-4 py-2 bg-[var(--color-error)] hover:bg-[var(--color-error-content)] text-[var(--color-error-content)] hover:text-white rounded-sm w-full cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;