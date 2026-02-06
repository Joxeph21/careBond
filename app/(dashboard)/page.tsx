import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "./dashboardClient";
import { fetchWithAuth } from "@/lib/auth/serverPrefetch";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["user-me"],
    queryFn: async () => {
      const data = await fetchWithAuth(
        `${process.env.BASE_BACKEND_URL}/auth/me`,
      );

      return data.data?.at(0);
    },
  });



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
