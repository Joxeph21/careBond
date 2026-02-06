"use client"
import ErrorPage from "@/components/ErrorPage";
import Loader from "@/components/common/Loader";
import useAdmin from "@/hooks/auth/useAdmin";
import { createContext, PropsWithChildren, useContext } from "react";

interface UserContextType {
  user: IUser;
  isSuperAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: PropsWithChildren) => {
  const { isSuperAdmin, isLoading, data, refetch, isFetched, error } =
    useAdmin();

  if (isLoading || !data) return <Loader />;

  if (isFetched && !data && error) return <ErrorPage retry={refetch} />;

  return (
    <UserContext.Provider value={{ user: data, isSuperAdmin: isSuperAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useSession must be used within a UserProvider");
  return context;
};

export {useSession, UserProvider}