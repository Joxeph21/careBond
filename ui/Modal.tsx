"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ICON } from "@/utils/icon-exports";
// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "motion/react";
import React, {
  cloneElement,
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ModalContextType {
  openWindows: string[];
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
  closePreviousModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal cannot be used outside its ModalProvider");
  }
  return context;
};

// 1. Create the ModalProvider component
export const Modal = ({ children }: PropsWithChildren) => {
  //   3. Tracking each modal with a name
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  //   4. Open modal based on its name
  const openModal = (name: string) => {
    setOpenWindows((prev) => [...prev.filter((n) => n !== name), name]); // prevent duplicates
  };

  //   Close modal funxtion
  const closeModal = (name: string) => {
    setOpenWindows((prev) => prev.filter((n) => n !== name));
  };

  const closeAllModals = () => {
    setOpenWindows([]);
  };

  const closePreviousModal = () => {
    setOpenWindows((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== prev.length - 2) : prev
    );
  };

  return (
    <ModalContext.Provider
      value={{
        openWindows,
        closeAllModals,
        closePreviousModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Wrap the desired trigger button around this to open the modal
Modal.Trigger = forwardRef(function Trigger(
  {
    name,
    children,
    onClick,
    disabled,
    className,
  }: {
    name: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  },
  ref: React.Ref<HTMLSpanElement>
) {
  const { openModal } = useModal();

  return (
    <span
      ref={ref}
      tabIndex={0}
      onClick={() => {
        onClick?.();
        if (disabled) return;
        openModal(name);
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </span>
  );
});

// This will be the Modal content
type ModalWindowProps = {
  name: string;
  title?: string;
  noClose?: boolean;
  className?: string;
  hasClose?: boolean;
  closeFunc?: () => void;
  backFunc?: () => void;
  hasBack?: boolean;

  text?: string;
  children?:
    | React.ReactElement<{
        onCloseModal?: () => void;
        onClosePrevious?: () => void;
        onCloseAll?: () => void;
      }>
    | ReactNode;
};

Modal.Window = function Window({
  name: Windowname,
  hasClose,
  title,
  closeFunc,
  className,
  noClose,
  hasBack,
  backFunc,
  textStyle,
  text,
  onClose,
  children,
  titleLeft,
}: {textStyle?: string, titleLeft?: boolean, onClose?: () => void} &ModalWindowProps) {
  const { openWindows, closeModal, closeAllModals, closePreviousModal } =
    useModal();

      const contentRef = useOutsideClick<HTMLDivElement>(
    () => {
      if (noClose) return;
      handleClose();
     
    },
    undefined,
    openWindows.includes(Windowname) &&
      openWindows[openWindows.length - 1] === Windowname
  );

  const isOpen = openWindows.includes(Windowname);

  const handleClose = () => {
    onClose?.();
    closeModal(Windowname);
  };

  return (
    <AnimatePresence mode="sync">
      {/* Backgound */}
      {isOpen && (
        <motion.section
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          className="fixed w-full top-0 inset-0 px-4 z-80 backdrop-blur-sm bg-black/50 h-screen flex items-center justify-center "
        >
          <motion.div
            //Track the open and close state so the animation can run each time it cjanges
            ref={contentRef}
            key={Windowname}
            initial={{ y: 100, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "backInOut" }}
            className={`shadow-card-shadow max-h-[90vh] w-full lg:min-w-96 overflow-y-auto lg:w-fit flex items-center flex-col gap-8 rounded-xl bg-white p-4 relative ${className}`}
          >
            <div className="w-full flex items-start  justify-between">
              <div className={`w-full flex flex-col  gap-1 ${titleLeft ? "items-start" : "items-center"}`}>
                <div className="flex items-center gap-3">
                  {hasBack && (
                    <Icon
                      icon={ICON.CARET_LEFT}
                      fontSize={30}
                      className="shrink-0 cursor-pointer"
                      onClick={() => backFunc?.()}
                    />
                  )}
                  <h2 className={`text-[#060B1E] font-medium  text-2xl ${titleLeft ? "text-left" : "text-center"}`}>
                    {title}
                  </h2>
                </div>
                {text && (
                  <p className={`text-gray text-[10px] sm:text-sm md:text-base text-wrap font-medium ${textStyle}`}>
                    {text}
                  </p>
                )}
              </div>
              {hasClose && (
                <span className="w-8 pl-1 shrink-0">
                  <Icon
                    onClick={handleClose}
                    icon={ICON.CANCEL}
                    className="shrink-0 text-[#AAAAAA] cursor-pointer"
                    fontSize={28}
                  />
                </span>
              )}
            </div>
            {children && typeof children === "object" && "type" in children
              ? cloneElement(
                  children as React.ReactElement<{
                    onCloseModal?: () => void;
                    onClosePrevious?: () => void;
                    onCloseAll?: () => void;
                  }>,
                  {
                    onCloseModal: () => closeModal(Windowname),
                    onClosePrevious: closePreviousModal,
                    onCloseAll: closeAllModals,
                  }
                )
              : children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};