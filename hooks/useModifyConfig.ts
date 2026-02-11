import { modifyInsitutionConfig } from "@/services/institutions.service";
import { modifyAdminConfig } from "@/services/superadmin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useModifyConfig(id: string, isSuperAdmin: boolean) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<
    BaseBackendResponse<Admin_Config | InstitutionConfig> | undefined,
    Error,
    Partial<Admin_Config> | Partial<InstitutionConfig>
  >({
    mutationFn: async (
      data: Partial<Admin_Config> | Partial<InstitutionConfig>,
    ) => {
      if (isSuperAdmin) {
        return await modifyAdminConfig(id, data as Partial<Admin_Config>);
      } else {
        return await modifyInsitutionConfig(
          id,
          data as Partial<InstitutionConfig>,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [isSuperAdmin ? "admin-config" : "institution-config"],
      });
    },
  });

  return { mutateAsync, isPending };
}
