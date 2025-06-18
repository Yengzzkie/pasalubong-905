"use client";
import { forwardRef, useImperativeHandle } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/app/components/dropzone"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { useParams } from "next/navigation";

const ImageUploader = forwardRef((_props, ref) => {
  const { userId } = useParams();

  const uploadProps = useSupabaseUpload({
    bucketName: "images",
    path: userId,
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    maxFileSize: 1000 * 1000 * 10, // 10MB
  });

  useImperativeHandle(ref, () => ({
    onUpload: uploadProps.onUpload,
  }));

  return (
    <div className="w-full">
      <Dropzone {...uploadProps}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
});


ImageUploader.displayName = "ImageUploader";
export default ImageUploader;