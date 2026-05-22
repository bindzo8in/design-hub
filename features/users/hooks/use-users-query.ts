import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { UserRow } from "../components/user-columns";
import { UserFormValues } from "../schemas/user.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Base API route path
const USERS_API_URL = "/api/admin/users";

export function useUsersQuery() {
  return useQuery<UserRow[], Error>({
    queryKey: ["users"],
    queryFn: () => apiClient.get<UserRow[]>(USERS_API_URL),
  });
}

export function useUserQuery(id: string, enabled = true) {
  return useQuery<UserRow, Error>({
    queryKey: ["users", id],
    queryFn: () => apiClient.get<UserRow>(`${USERS_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<UserRow, Error, UserFormValues>({
    mutationFn: (data) => apiClient.post<UserRow>(USERS_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      router.push("/admin/users");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });
}

export function useUpdateUserMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<UserRow, Error, UserFormValues>({
    mutationFn: (data) => apiClient.put<UserRow>(`${USERS_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", id] });
      toast.success("User updated successfully");
      router.push("/admin/users");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${USERS_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
}
