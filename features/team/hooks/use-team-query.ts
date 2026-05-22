import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TeamMemberRow } from "../components/team-columns";
import { TeamMemberFormValues } from "../schemas/team.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TEAM_API_URL = "/api/admin/team";

export function useTeamMembersQuery() {
  return useQuery<TeamMemberRow[], Error>({
    queryKey: ["teamMembers"],
    queryFn: () => apiClient.get<TeamMemberRow[]>(TEAM_API_URL),
  });
}

export function useTeamMemberQuery(id: string, enabled = true) {
  return useQuery<TeamMemberRow, Error>({
    queryKey: ["teamMembers", id],
    queryFn: () => apiClient.get<TeamMemberRow>(`${TEAM_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateTeamMemberMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<TeamMemberRow, Error, TeamMemberFormValues>({
    mutationFn: (data) => apiClient.post<TeamMemberRow>(TEAM_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast.success("Team member added successfully");
      router.push("/admin/team");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add team member");
    },
  });
}

export function useUpdateTeamMemberMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<TeamMemberRow, Error, TeamMemberFormValues>({
    mutationFn: (data) => apiClient.put<TeamMemberRow>(`${TEAM_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      queryClient.invalidateQueries({ queryKey: ["teamMembers", id] });
      toast.success("Team member updated successfully");
      router.push("/admin/team");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update team member");
    },
  });
}

export function useDeleteTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${TEAM_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast.success("Team member removed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove team member");
    },
  });
}
