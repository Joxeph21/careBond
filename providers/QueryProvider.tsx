"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: Readonly<React.ReactNode> }) {

    const client = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 60 * 24,
                refetchOnWindowFocus: true,
                retry: 1,
            }
        }
    })

    return <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>


}