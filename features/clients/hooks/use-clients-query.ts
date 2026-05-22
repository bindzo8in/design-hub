import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ClientRow } from "../components/client-columns";
import { ClientFormValues } from "../schemas/client.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CLIENTS_API_URL = "/api/admin/clients";

export function useClientsQuery() {
  return useQuery<ClientRow[], Error>({
    queryKey: ["clients"],
    queryFn: () => apiClient.get<ClientRow[]>(CLIENTS_API_URL),
  });
}

export function useClientQuery(id: string, enabled = true) {
  return useQuery<ClientRow, Error>({
    queryKey: ["clients", id],
    queryFn: () => apiClient.get<ClientRow>(`${CLIENTS_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ClientRow, Error, ClientFormValues>({
    mutationFn: (data) => apiClient.post<ClientRow>(CLIENTS_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client profile added successfully");
      router.push("/admin/clients");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add client profile");
    },
  });
}

export function useUpdateClientMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ClientRow, Error, ClientFormValues>({
    mutationFn: (data) => apiClient.put<ClientRow>(`${CLIENTS_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Client profile updated successfully");
      router.push("/admin/clients");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update client profile");
    },
  });
}

export function useDeleteClientMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${CLIENTS_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Client profile removed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove client profile");
    },
  });
}
