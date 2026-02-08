import {
  createFamilyMember,
  getPatients,
  assignMember,
  AddPatientCamera,
  getCameras,
  AssignmentPayload,
  toggleCameraAccess,
  Camera_access_request,
  getPatientVitals,
} from "@/services/patient.service";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function usePatients(params?: Paginator) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ["patients", params],
    queryFn: ({ pageParam = 1 }) => getPatients({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    initialPageParam: 1,
  });

  const total_count = data?.pages[0]?.count;
  const patients = data?.pages.flatMap((page) => page?.results ?? []);

  return {
    total_count,
    patients,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
  };
}

export function useCreateFamilyMember() {
  const queryClient = useQueryClient();
  const { mutate: create_family, isPending } = useMutation({
    mutationFn: createFamilyMember,
    onSuccess: (_, variables) => {
      toast.success("Family member created successfully");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users", variables],
      });
    },
    onError: () => {
      toast.error("Failed to create family member");
    },
  });

  return { create_family, isPending };
}

export function useAssignMember(id: string, type: IUser["role"] = "family") {
  const queryClient = useQueryClient();
  const {
    mutate: assign_member,
    mutateAsync: assign_member_async,
    isPending,
  } = useMutation({
    mutationFn: (data: { member_id: string }) => {
      const payload: AssignmentPayload = {
        relationship: type === "family" ? "family" : undefined,
      };

      if (type === "family") payload.family_member_id = data.member_id;
      if (type === "patient") payload.patient_id = data.member_id;
      if (type === "professional") payload.professional_id = data.member_id;

      return assignMember({ id, data: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["I-Users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["institution-user", id],
      });
    },
    onError: () => {
      toast.error(`Failed to assign ${type}`);
    },
  });

  return { assign_member, assign_member_async, isPending };
}

export function useAddCameras() {
  const queryClient = useQueryClient();
  const { mutate: add_camera, isPending } = useMutation({
    mutationFn: AddPatientCamera,
    onSuccess: () => {
      toast.success("Camera Added");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["I-Users"] });
      queryClient.invalidateQueries({ queryKey: ["Cameras"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { add_camera, isPending };
}

export function useGetCameras(params?: Paginator) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Cameras", params],
    queryFn: () => getCameras(params),
  });

  const cameras = data?.results;
  const total_count = data?.count;
  const active_cameras_count = data?.active_cameras_count;
  const nextPage = data?.next !== null;
  const prevPage = data?.previous !== null;

  return {
    cameras,
    isLoading,
    error,
    refetch,
    total_count,
    active_cameras_count,
    nextPage,
    prevPage,
  };
}

export function useToggleCameraAccess(id: string, status: boolean) {
  const queryClient = useQueryClient();
  const { mutate: toggle_camera_access, isPending } = useMutation({
    mutationFn: (data: Camera_access_request) => toggleCameraAccess(id, data),
    onSuccess: () => {
      toast.success(`Camera Access ${status ? "disabled" : "enabled"}`);
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["I-Users"] });
      queryClient.invalidateQueries({ queryKey: ["Cameras"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { toggle_camera_access, isPending };
}

export function useGetPatientVitals(id: string) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["vitals", id],
    queryFn: () => getPatientVitals(id),
    enabled: !!id,
  });

  return {
    vitals: data?.data,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
}
