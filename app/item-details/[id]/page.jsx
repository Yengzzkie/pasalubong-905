"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import CallIcon from "@mui/icons-material/Call";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Carousel from "@/app/components/Carousel";
import StaggeredDropDown from "@/app/components/StaggeredDropDown";
import GoogleMap from "@/app/components/GoogleMap";
import SkeletonLoader from "@/app/components/ui/SkeletonLoader";
import Tag from "@/app/components/ui/Tag";
import UserAvatarCard from "@/app/components/UserAvatarCard";
import EditPostForm from "@/app/components/EditPostForm";
import DeleteModal from "@/app/components/DeleteModal";
import SendMessageModal from "@/app/components/SendMessageModal";
import Toast from "@/app/components/Toast";
import BackButton from "@/app/components/ui/BackButton";

const conditionMap = {
  NEW: "New",
  USED_LIKE_NEW: "Used - Like New",
  USED_VERY_GOOD: "Used - Very Good",
  USED_GOOD: "Used - Good",
  USED_ACCEPTABLE: "Used - Acceptable",
  FOR_PARTS: "For Parts",
  FOR_REPAIR: "For Repair",
  FOR_SCRAP: "For Scrap",
  FOR_RECYCLE: "For Recycle",
};

export default function ItemDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const session = useSession();
  const isAuthor = session?.data?.user?.id && itemData?.author?.id === session?.data?.user?.id;
  const itemCondition = conditionMap[itemData?.condition] || "Unknown";

  async function fetchPostDetails() {
    try {
      const response = await axios.get(`/api/posts/post?postId=${id}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }

  useEffect(() => {
    if (id) fetchPostDetails();
  }, [id]);

  function handleDelete() {
    setIsOpen(false);
    router.back(); // Redirect to home page after deletion
  }

  if (isEditMode) {
    return (
      <div className="min-h-screen flex flex-col p-1 lg:px-40">
        <StaggeredDropDown setIsEditMode={setIsEditMode} />
        <EditPostForm
          postData={itemData}
          setIsEditMode={setIsEditMode}
          fetchPostDetails={fetchPostDetails}
        />
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="p-4">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-3 lg:px-40">
      <BackButton />
      {isAuthor && (
        <StaggeredDropDown
          setIsOpen={setIsOpen}
          setIsEditMode={setIsEditMode}
        />
      )}
      <Toast />
      <Carousel itemData={itemData.image} />

      {/* Title */}
      <h1 className="text-2xl lg:text-4xl font-bold mb-2 mt-8">
        {itemData.title}
      </h1>

      {/* Posted Info */}
      <p className="text-gray-600 mb-2 italic">
        Posted {getTimeAgo(itemData.createdAt)} ago
      </p>

      <hr className="my-6" />

      {/* Description */}
      <div className="flex flex-col gap-8 pt-2">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Description</h4>
          <div className="text-gray-600 whitespace-pre-wrap">
            {itemData?.content}
          </div>
          {itemData?.tags?.length > 0 && (
            <div className="flex items-start mt-4 gap-1">
              <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
                Tags:
              </Typography>
              <Tag data={itemData.tags} />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Condition */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold">Condition</h4>
        <p className="text-gray-600">{itemCondition}</p>
      </div>

      <hr className="my-6" />

      {/* Contact */}
      {isAuthor ? (
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Contact Information</h4>
          <p className="text-gray-600">
            You can edit your contact information in your profile settings.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {session?.status === "authenticated" ? (
            <div className="flex flex-col gap-3">
              <h4 className="text-xl font-semibold">Contact</h4>
              <p className="text-gray-600">
                If you have any questions, feel free to reach out to the owner.
              </p>
              <a
                href={`tel:${itemData.contact_number}`}
                className="hover:bg-[var(--color-primary-content)] hover:text-white rounded text-[var(--color-primary-content)] bg-[var(--color-primary)] text-center w-full py-2 px-8 transition"
              >
                <CallIcon /> Call
              </a>
              <button
                onClick={() => setOpenSendMessage(true)}
                className="bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:text-white px-4 py-2 rounded hover:bg-[var(--color-primary-content)] transition cursor-pointer"
              >
                <ChatBubble className="inline mr-1" />
                Send Message
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              Please{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                log in
              </a>{" "}
              to contact the owner.
            </p>
          )}
        </div>
      )}

      {/* Phone */}

      <hr className="my-6" />

      {/* Map */}
      <h4 className="text-zinc-600 text-md">
        {itemData.location?.city}, {itemData.location?.province}
      </h4>
      <GoogleMap location={itemData.location} />

      <hr className="my-6" />

      {/* Author avatar card */}
      <div>
        <h4 className="text-xl font-semibold mb-2">Listed by:</h4>
        <UserAvatarCard userData={itemData?.author} />
      </div>

      <DeleteModal
        data={itemData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={handleDelete}
      />
      <SendMessageModal
        data={itemData}
        setOpenToast={setOpenToast}
        openMessageDialog={openSendMessage}
        setOpenMessageDialog={setOpenSendMessage}
      />
      <Toast openToast={openToast} setOpenToast={setOpenToast} />
    </div>
  );
}
