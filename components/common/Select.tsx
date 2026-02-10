"use client";
import Popover from "@/ui/Popover";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
  useRef,
} from "react";
import Skeleton from "./Skeleton";
import ActivityIndicator from "./ActivityIndicator";

type SIZE = "small" | "regular" | "full";

type VARIANT = "regular" | "themed" | "secondary";

type SelectProps<Z> = {
  data?: OptionsType<Z>[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  size?: SIZE;
  icon?: string;
  variant: VARIANT;
  onChange?:
    | ((val: Z, obj?: OptionsType<Z>) => void)
    | ((val: Z, obj?: OptionsType<Z>) => Promise<void | unknown>);
  type?: "default" | "optimistic";
  themedClass?: string;
  required?: boolean;
  isLoading?: boolean;
  name?: string;
  hasSearch?: boolean;
  searchTerm?: string;
  disabled?: boolean;
  defaultValue?: Z;
  hasInfinteQuery?: boolean;
  fetchingNextPage?: boolean;
  onIntersect?: () => void;
};

export default function Select<Z>(props: PropsWithChildren & SelectProps<Z>) {
  if (props.type === "optimistic") {
    return <OptimisticSelect {...props} />;
  }

  return <SelectUI {...props} />;
}

function OptimisticSelect<Z>({
  defaultValue,
  onChange,
  ...props
}: PropsWithChildren & SelectProps<Z>) {
  const [isPending, startTransition] = useTransition();

  const [optimisticValue, setOptimisticValue] = useOptimistic(
    defaultValue,
    (_state, newValue: Z) => newValue,
  );

  const handleSelect = (val: Z, obj?: OptionsType<Z>) => {
    startTransition(async () => {
      setOptimisticValue(val);
      try {
        await onChange?.(val, obj);
      } catch (error) {
        console.error("Select optimistic update failed:", error);
      }
    });
  };

  return (
    <SelectUI
      {...props}
      defaultValue={optimisticValue}
      onChange={handleSelect}
      disabled={isPending || props.isLoading}
      isLoading={props.isLoading}
    />
  );
}

function SelectUI<Z>(props: PropsWithChildren & SelectProps<Z>) {
  const {
    data,
    name = "",
    isLoading,
    placeholder = "Select",
    label,
    error,
    errorMessage,
    size = "regular",
    onChange,
    icon,
    variant,
    required,
    themedClass,
    children,
    disabled,
    hasSearch,
    searchTerm = "sq",
    defaultValue,
    hasInfinteQuery,
    fetchingNextPage,
    onIntersect,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = useMemo(() => {
    if (defaultValue !== undefined && data?.length) {
      const opt = data.find((o) => o.value === defaultValue);
      if (opt) return opt.label;
    }

    return data?.at(0)?.label ?? placeholder;
  }, [defaultValue, data, placeholder]);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get(searchTerm) || "",
  );

  const updateSearchParam = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set(searchTerm, value);
        } else {
          params.delete(searchTerm);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }, 500),
    [pathname, router, searchParams, searchTerm],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateSearchParam(value);
  };

  useEffect(() => {
    return () => {
      updateSearchParam.cancel();
    };
  }, [updateSearchParam]);

  const sizes: Record<NonNullable<SIZE>, string> = {
    small: "w-32",
    regular: "w-fit",
    full: "w-full",
  };

  const variants: Record<NonNullable<VARIANT>, string> = {
    regular: "text-[#676767] bg-white ring ring-grey",
    secondary: "",
    themed: themedClass ?? "text-[#4A4A4A] bg-[#F4F6FA]",
  };

  const filteredData = data;

  const handleSelect = (val: OptionsType<Z>) => {
    onChange?.(val.value as Z, val);
  };

  return (
    <Popover>
      <div className={`${sizes[size]} flex flex-col gap-2`}>
        {label && (
          <p className="flex items-center gap-1">
            {label}
            {required && <span className="text-danger">*</span>}
          </p>
        )}
        <Popover.Menu>
          <Popover.Trigger disabled={isLoading || disabled || !data}>
            <button
              disabled={disabled}
              className={`${variants[variant]} disabled:cursor-not-allowed py-2 group px-3 rounded-md  w-full flex-between gap-2 ${isLoading ? "cursor-wait" : "cursor-pointer"}`}
              type="button"
            >
              {children}
              {isLoading ? `Loading ${name}...` : selected}
              <span className="shrink group-focus:rotate-180 ease-in transition-all duration-200">
                <Icon icon={icon ?? ICON.CARET_DOWN2} fontSize={20} />
              </span>
            </button>
          </Popover.Trigger>

          <Popover.Content className="shadow-xl!">
            {(closepopover) => (
              <div className="flex flex-col gap-2 min-w-30">
                {hasSearch && (
                  <div className="relative px-2 py-1">
                    <input
                      type="text"
                      className="w-full pl-8 pr-3 py-2 text-sm border-b border-gray-100 outline-none focus:border-primary transition-colors"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Icon
                      icon={ICON.SEARCH}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      fontSize={16}
                    />
                  </div>
                )}
                <ul className="flex flex-col items-start gap-1 max-h-60 overflow-y-auto">
                  {filteredData?.map((el) => (
                    <li
                      onClick={() => {
                        handleSelect(el);
                        closepopover();
                        setSearchQuery("");
                      }}
                      className="cursor-pointer flex-between p-2 w-full hover:bg-gray-100 rounded-md transition-colors"
                      key={el.label}
                    >
                      {el.label}

                      {selected === el.label && (
                        <span className="text-primary">
                          <Icon icon={ICON.CHECKMARK} fontSize={20} />
                        </span>
                      )}
                    </li>
                  ))}

                  {hasInfinteQuery && (
                    <InfiniteScrollObserver
                      onIntersect={onIntersect}
                      isLoading={fetchingNextPage}
                    />
                  )}

                  {hasSearch && isLoading ? (
                    <p className="flex">
                      <ActivityIndicator size={20} />
                      <em>Loading...</em>
                    </p>
                  ) : (
                    hasSearch &&
                    filteredData?.length === 0 && (
                      <li className="p-2 text-sm text-gray-400 italic">
                        No results found
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </Popover.Content>
        </Popover.Menu>
        {error && <p className="font-medium text-danger">{errorMessage}</p>}
      </div>
    </Popover>
  );
}

function InfiniteScrollObserver({
  onIntersect,
  isLoading,
}: {
  onIntersect?: () => void;
  isLoading?: boolean;
}) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onIntersect) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, isLoading]);

  return (
    <div ref={observerRef} className="w-full flex flex-col gap-1">
      {isLoading && (
        <>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      )}
    </div>
  );
}
