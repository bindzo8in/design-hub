import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { CategoryRow } from "../components/category-columns";
import { CategoryFormValues } from "../schemas/category.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CATEGORIES_API_URL = "/api/admin/categories";

export function useCategoriesQuery() {
  return useQuery<CategoryRow[], Error>({
    queryKey: ["categories"],
    queryFn: () => apiClient.get<CategoryRow[]>(CATEGORIES_API_URL),
  });
}

export function useCategoryQuery(id: string, enabled = true) {
  return useQuery<CategoryRow, Error>({
    queryKey: ["categories", id],
    queryFn: () => apiClient.get<CategoryRow>(`${CATEGORIES_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CategoryRow, Error, CategoryFormValues>({
    mutationFn: (data) => apiClient.post<CategoryRow>(CATEGORIES_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
      router.push("/admin/categories");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
}

export function useUpdateCategoryMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CategoryRow, Error, CategoryFormValues>({
    mutationFn: (data) => apiClient.put<CategoryRow>(`${CATEGORIES_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", id] });
      // Invalidate projects since project category name might be cached
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Category updated successfully");
      router.push("/admin/categories");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category");
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${CATEGORIES_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
}
