import { getInstitutionConfig } from "@/services/institutions.service";
import { useQuery } from "@tanstack/react-query";

export const useIConfig = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["institution-config"],
    queryFn: getInstitutionConfig,
  });

  return {data, isLoading, error};
};