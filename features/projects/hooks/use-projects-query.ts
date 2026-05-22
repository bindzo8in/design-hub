import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ProjectRow } from "../components/project-columns";
import { ProjectFormValues } from "../schemas/project.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PROJECTS_API_URL = "/api/admin/projects";

export function useProjectsQuery() {
  return useQuery<ProjectRow[], Error>({
    queryKey: ["projects"],
    queryFn: () => apiClient.get<ProjectRow[]>(PROJECTS_API_URL),
  });
}

export function useProjectQuery(id: string, enabled = true) {
  return useQuery<ProjectRow, Error>({
    queryKey: ["projects", id],
    queryFn: () => apiClient.get<ProjectRow>(`${PROJECTS_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ProjectRow, Error, ProjectFormValues>({
    mutationFn: (data) => apiClient.post<ProjectRow>(PROJECTS_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      router.push("/admin/projects");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}

export function useUpdateProjectMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ProjectRow, Error, ProjectFormValues>({
    mutationFn: (data) => apiClient.put<ProjectRow>(`${PROJECTS_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
      toast.success("Project updated successfully");
      router.push("/admin/projects");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${PROJECTS_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
}
