"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NotificationTab from "../common/NotificationTab";
import Image from "next/image";
import useAdmin from "@/hooks/auth/useAdmin";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Modal, useModal } from "@/ui/Modal";
import { useUploadProfilePicture } from "@/hooks/auth/useProfilePicture";
import toast from "react-hot-toast";

export default function UserTab() {
  const { data } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const profileImage = data?.profile_image_url || "/profile.png";

  return (
    <Modal>
      <nav className="flex-center text-[#E4E4E4] gap-5">
        <NotificationTab />|
        <div className="relative">
          <button
            ref={toggleRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="size-9.5 relative overflow-hidden bg-grey cursor-pointer rounded-full ring-2 ring-transparent hover:ring-primary/30 transition-all duration-200"
          >
            <Image
              src={profileImage}
              fill
              className="object-cover object-center"
              alt="User Profile Picture"
            />
          </button>

          <ProfileDropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            ignoreRef={toggleRef}
            profileImage={profileImage}
          />
        </div>
      </nav>
    </Modal>
  );
}

function ProfileDropdown({
  isOpen,
  onClose,
  ignoreRef,
  profileImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  ignoreRef: React.RefObject<HTMLButtonElement | null>;
  profileImage: string;
}) {
  const handleClose = useCallback(() => onClose(), [onClose]);
  const dropdownRef = useOutsideClick<HTMLDivElement>(
    handleClose,
    ignoreRef,
    isOpen,
  );
  const { openModal, closeModal } = useModal();
  const { uploadProfilePicture, isUploading } = useUploadProfilePicture();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleViewProfile = () => {
    openModal("view-profile-image");
    onClose();
  };

  const handleChangeProfile = () => {
    fileInputRef.current?.click();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      openModal("change-profile-image");
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      await uploadProfilePicture(selectedFile);
      toast.success("Profile picture updated!");
      closeModal("change-profile-image");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update profile picture",
      );
    }
  };

  const handleCancelChange = () => {
    closeModal("change-profile-image");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card-shadow border border-gray-100 overflow-hidden z-50 origin-top-right"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="size-10 relative rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
                <Image
                  src={profileImage}
                  fill
                  className="object-cover object-center"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold text-[#212B36] truncate">
                  {/* data?.name || "User" */}
                  My Profile
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  Manage your photo
                </p>
              </div>
            </div>

            {/* Actions */}
            <ul className="py-1.5">
              <li>
                <button
                  onClick={handleViewProfile}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#474747] hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <span className="size-8 rounded-lg bg-primary/10 flex-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon icon="tabler:eye" fontSize={18} />
                  </span>
                  <span className="font-medium">View Profile Picture</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleChangeProfile}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#474747] hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <span className="size-8 rounded-lg bg-emerald-500/10 flex-center text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon icon="tabler:camera" fontSize={18} />
                  </span>
                  <span className="font-medium">Change Profile Picture</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input for changing profile picture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Modal for viewing profile picture */}
      <Modal.Window
        name="view-profile-image"
        hasClose
        title="Profile Picture"
        className="w-lg!"
      >
        <div className="flex flex-col items-center gap-4 p-2">
          <figure className="relative size-64 rounded-2xl overflow-hidden ring-4 ring-gray-100 shadow-lg">
            <Image
              src={profileImage}
              fill
              className="object-cover object-center"
              alt="User Profile Picture Full View"
            />
          </figure>
        </div>
      </Modal.Window>

      {/* Modal for previewing & saving new profile picture */}
      <Modal.Window
        name="change-profile-image"
        hasClose
        title="Change Profile Picture"
        className="w-lg!"
        onClose={handleCancelChange}
      >
        <div className="flex flex-col items-center gap-5 p-2">
          {previewUrl && (
            <figure className="relative size-64 rounded-2xl overflow-hidden ring-4 ring-gray-100 shadow-lg">
              <Image
                src={previewUrl}
                fill
                className="object-cover object-center"
                alt="New Profile Picture Preview"
              />
            </figure>
          )}

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleCancelChange}
              disabled={isUploading}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary text-sm font-medium text-primary hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="tabler:camera" fontSize={16} />
              Change
            </button>
            <button
              onClick={handleSave}
              disabled={isUploading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}
