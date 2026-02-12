"use client";

import {
  getSignedUrl,
  updateUserProfilePicture,
  uploadFileToS3,
} from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// Step 1: Get the signed URL from the backend
export function useGetSignedUrl() {
  const { mutateAsync: getUploadUrl, isPending: isGettingUrl } = useMutation({
    mutationFn: (data: FormData) => getSignedUrl(data),
  });

  return { getUploadUrl, isGettingUrl };
}

// Step 2: Upload the file to S3 using the signed URL
export function useUploadToS3() {
  const { mutateAsync: uploadToS3, isPending: isUploading } = useMutation({
    mutationFn: ({ uploadUrl, file }: { uploadUrl: string; file: File }) =>
      uploadFileToS3(uploadUrl, file),
  });

  return { uploadToS3, isUploading };
}

// Step 3: Update the user's profile image URL in the database
export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfilePicture, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: { profile_image_url: string }) =>
        updateUserProfilePicture(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-me"] });
      },
    });

  return { updateProfilePicture, isUpdating };
}

// Convenience hook: Orchestrates the full upload flow (Steps 1 → 2 → 3)
export function useUploadProfilePicture() {
  const { getUploadUrl } = useGetSignedUrl();
  const { uploadToS3 } = useUploadToS3();
  const { updateProfilePicture } = useUpdateProfilePicture();
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfilePicture = async (file: File) => {
    setIsUploading(true);
    try {
      // Step 1: Get signed URL
      const formData = new FormData();
      formData.append("file_name", file.name);
      formData.append("content_type", file.type);
      const signedData = await getUploadUrl(formData);

      if (!signedData?.upload_url || !signedData?.object_url) {
        throw new Error("Failed to get signed URL");
      }

      // Step 2: Upload file directly to S3
      await uploadToS3({ uploadUrl: signedData.upload_url, file });

      // Step 3: Update profile image URL in database
      await updateProfilePicture({
        profile_image_url: signedData.object_url,
      });

      return signedData.object_url;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadProfilePicture, isUploading };
}
