"use client";
import { forwardRef, useImperativeHandle } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/app/components/dropzone"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";

const ImageUploader = forwardRef((_props, ref) => {

  const uploadProps = useSupabaseUpload({
    bucketName: "images",
    path: "item",
    allowedMimeTypes: ["image/*"],
    maxFiles: 1,
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