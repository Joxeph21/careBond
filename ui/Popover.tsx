"use client";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type DimensionType = { x: number; y: number };
type SizeType = { width: number; height: number };

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position: DimensionType;
  setPosition: Dispatch<SetStateAction<DimensionType>>;
  size: SizeType;
  setSize: Dispatch<SetStateAction<SizeType>>;
  isNearBottom: boolean;
  setIsNearBottom: Dispatch<SetStateAction<boolean>>;
}
// Create a context to be shared among children
const PopoverContext = createContext<PopoverContextType | null>(null);

// Use context
const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context)
    throw new Error("Popover context was used outside it's provider");
  return context;
};

//Declare Parent Element to house all props
export default function Popover({
  children,
  defState,
}: { defState?: boolean } & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(defState || false);
  const [position, setPosition] = useState<DimensionType>({
    x: 0,
    y: 0,
  });
  const [size, setSize] = useState<SizeType>({ width: 0, height: 0 });
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        size,
        setSize,
        position,
        setPosition,
        isNearBottom,
        setIsNearBottom,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

// Menu so we can make the dropdown absolute
Popover.Menu = function Menu({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  const { setIsOpen } = usePopover();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Debugging Purpose
  // console.log(isOpen ? "Dropdown is open" : "Dropdown is closed")

  return (
    <div ref={ref} className={`relative  ${className}`}>
      {children}
    </div>
  );
};

// Trigger button to toggle dropdown
Popover.Trigger = function Trigger({ children }: PropsWithChildren) {
  const { setIsOpen, isOpen, setPosition, setSize, setIsNearBottom } =
    usePopover();
  const triggerRef = useRef<HTMLDivElement>(null);
  //   Get dimension of child

  useEffect(() => {
    const rect = triggerRef?.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: rect?.x,
      y: rect?.y,
    });
    setSize({
      width: rect.width,
      height: rect.height,
    });

    if (window.innerHeight - rect.bottom < 200) {
      setIsNearBottom(true);
    } else {
      setIsNearBottom(false);
    }
  }, [setPosition, setSize, setIsNearBottom, isOpen]);

  // Debigging purpose
  // console.log({ rect: triggerRef.current?.getBoundingClientRect() });

  return (
    <div
      ref={triggerRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      className="outline-0"
    >
      {children}
    </div>
  );
};

interface PopoverContentProps {
  children: (closePopOver: () => void) => React.ReactNode;
}

Popover.Content = function Content({
  children,
  className,
}: { className?: string } & PopoverContentProps) {
  const { size, isOpen, setIsOpen, isNearBottom } = usePopover();

  if (!isOpen) return null;

  const closePopOver = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.ul
        key={isOpen ? 1 : 0}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          top: isNearBottom ? undefined : size.height + 12,
          bottom: isNearBottom ? size.height + 12 : undefined,
          width: "auto",
          minWidth: size.width,
        }}
        className={`rounded-lg right-0 flex flex-col gap-5 shadow-card-shadow z-30 absolute min-h-4 bg-white py-4 px-3 ${className}`}
      >
        {children(closePopOver)}
      </motion.ul>
    </AnimatePresence>
  );
};