"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import useAdmin from "@/hooks/auth/useAdmin";
import { useGetInstitutions } from "@/hooks/superadmin/useInstitutions";
import useIUsers from "@/hooks/superadmin/useIUsers";
import { useGetIUsers } from "@/hooks/institution/useInstitutionsUsers";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

type SearchBoxProps = {
  placeholder?: string;
  searchKey?: string;
  className?: string;
};

export default function SearchBox({
  placeholder = "Global Search",
  searchKey = "q",
  className,
}: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get(searchKey) ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useOutsideClick<HTMLDivElement>(
    () => setIsFocused(false),
    undefined,
    isFocused,
  );

  const updateQueryParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set(searchKey, value);
      } else {
        params.delete(searchKey);
      }

      if (params.toString() === searchParams?.toString()) return;

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, searchKey],
  );

  // Update 6 seconds after the user types
  const debouncedUpdate = useMemo(
    () => debounce(updateQueryParam, 600),
    [updateQueryParam],
  );

  useEffect(() => {
    debouncedUpdate(query);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [query, debouncedUpdate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdate.cancel(); 
    updateQueryParam(query);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-87.5">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`w-full gap-3 ring px-4.5 py-3 ring-[#E4E4E4] rounded-[10px] flex items-center transition-all duration-200 ${isFocused ? "ring-primary/40 shadow-sm" : ""} ${className}`}
      >
        <button type="submit" className="shrink-0 cursor-pointer">
          <Icon
            icon={ICON.SEARCH}
            color={isFocused ? "#4F46E5" : "#959595"}
            fontSize={21}
          />
        </button>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-0 w-full placeholder:text-[#959595]"
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="shrink-0 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="tabler:x" fontSize={16} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 w-lg bg-white rounded-xl shadow-card-shadow border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            <SearchResults query={query} onSelect={() => setIsFocused(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Search Results Panel ─────────────────────────────────────────

function SearchResults({
  query,
  onSelect,
}: {
  query: string;
  onSelect: () => void;
}) {
  const { data: admin, isSuperAdmin } = useAdmin();

  if (!query.trim()) {
    return <QuickLinks isSuperAdmin={isSuperAdmin} onSelect={onSelect} />;
  }

  return isSuperAdmin ? (
    <SuperAdminResults query={query} onSelect={onSelect} />
  ) : (
    <InstitutionResults
      query={query}
      institutionId={admin?.institution_id}
      onSelect={onSelect}
    />
  );
}

// ─── Quick Links (shown when no query) ─────────────────────────────

function QuickLinks({
  isSuperAdmin,
  onSelect,
}: {
  isSuperAdmin: boolean;
  onSelect: () => void;
}) {
  const links = isSuperAdmin
    ? [
        {
          label: "Institutions",
          href: "/institutions",
          icon: "tabler:building",
        },
        { label: "Users", href: "/users", icon: "tabler:users" },
        { label: "Plans", href: "/plans", icon: "tabler:credit-card" },
        { label: "Configurations", href: "/config", icon: "tabler:settings" },
      ]
    : [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: "tabler:layout-dashboard",
        },
        { label: "Users", href: "/users", icon: "tabler:users" },
        { label: "Configurations", href: "/config", icon: "tabler:settings" },
      ];

  return (
    <div className="p-3">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
        Quick Links
      </p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onSelect}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#474747] hover:bg-gray-50 transition-colors"
            >
              <span className="size-8 rounded-lg bg-primary/10 flex-center text-primary shrink-0">
                <Icon icon={link.icon} fontSize={16} />
              </span>
              <span className="font-medium">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Super Admin Results (Users + Institutions) ────────────────────

function SuperAdminResults({
  query,
  onSelect,
}: {
  query: string;
  onSelect: () => void;
}) {
  const { institutions, isLoading: loadingInst } = useGetInstitutions({
    query,
    page: 1,
  });
  const { users, isLoading: loadingUsers } = useIUsers(true, {
    query,
    page: 1,
  });

  const isLoading = loadingInst || loadingUsers;
  const hasInstitutions = institutions && institutions.length > 0;
  const hasUsers = users && users.length > 0;
  const noResults = !isLoading && !hasInstitutions && !hasUsers;

  return (
    <div className="p-2">
      {isLoading && <SearchSkeleton />}

      {noResults && <EmptyState query={query} />}

      {hasInstitutions && (
        <div className="mb-1">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Institutions
          </p>
          <ul>
            {institutions.map((inst) => (
              <li key={inst.id}>
                <Link
                  href={`/institutions/${inst.id}`}
                  onClick={onSelect}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="size-9 rounded-full bg-primary/10 flex-center text-primary shrink-0">
                    <Icon icon="tabler:building" fontSize={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#212B36] truncate">
                      {inst.name}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {inst.contact_email}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${inst.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                  >
                    {inst.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasUsers && (
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Users
          </p>
          <ul>
            {users.map((user) => (
              <UserResultItem key={user.id} user={user} onSelect={onSelect} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Institution Results (Institution Users) ──────────────────────

function InstitutionResults({
  query,
  institutionId,
  onSelect,
}: {
  query: string;
  institutionId: string | null | undefined;
  onSelect: () => void;
}) {
  const { users, isLoading } = useGetIUsers(institutionId, {
    query,
    page: 1,
  });

  const hasUsers = users && users.length > 0;
  const noResults = !isLoading && !hasUsers;

  return (
    <div className="p-2">
      {isLoading && <SearchSkeleton />}

      {noResults && <EmptyState query={query} />}

      {hasUsers && (
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Users
          </p>
          <ul>
            {users.map((user) => (
              <UserResultItem key={user.id} user={user} onSelect={onSelect} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────

function UserResultItem({
  user,
  onSelect,
}: {
  user: User | IUser;
  onSelect: () => void;
}) {
  return (
    <li>
      <Link
        href={`/users/${user.id}`}
        onClick={onSelect}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <figure className="size-9 rounded-full overflow-hidden relative shrink-0 bg-gray-100">
          <Image
            src={user.profile_image_url || "/profile.png"}
            fill
            className="object-cover object-center"
            alt={`${user.full_name}_avatar`}
          />
        </figure>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#212B36] truncate">
            {user.full_name}
          </p>
          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
        </div>
        <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 capitalize shrink-0">
          {user.role_display}
        </span>
      </Link>
    </li>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-8 px-4">
      <Icon icon="tabler:search-off" fontSize={32} className="text-gray-300" />
      <p className="text-sm text-gray-400">
        No results for &quot;
        <span className="font-medium text-gray-500">{query}</span>&quot;
      </p>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="p-2 space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2">
          <div className="size-9 rounded-full bg-gray-100 animate-pulse shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-2.5 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
