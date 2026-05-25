import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TestimonialRow } from "../components/testimonial-columns";
import { TestimonialFormValues } from "../schemas/testimonial.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TESTIMONIALS_API_URL = "/api/admin/testimonials";

export function useTestimonialsQuery() {
  return useQuery<TestimonialRow[], Error>({
    queryKey: ["testimonials"],
    queryFn: () => apiClient.get<TestimonialRow[]>(TESTIMONIALS_API_URL),
  });
}

export function useTestimonialQuery(id: string, enabled = true) {
  return useQuery<TestimonialRow, Error>({
    queryKey: ["testimonials", id],
    queryFn: () => apiClient.get<TestimonialRow>(`${TESTIMONIALS_API_URL}/${id}`),
    enabled: !!id && enabled,
  });
}

export function useCreateTestimonialMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<TestimonialRow, Error, TestimonialFormValues>({
    mutationFn: (data) => apiClient.post<TestimonialRow>(TESTIMONIALS_API_URL, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial added successfully");
      router.push("/admin/testimonials");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add testimonial");
    },
  });
}

export function useUpdateTestimonialMutation(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<TestimonialRow, Error, TestimonialFormValues>({
    mutationFn: (data) => apiClient.put<TestimonialRow>(`${TESTIMONIALS_API_URL}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials", id] });
      toast.success("Testimonial updated successfully");
      router.push("/admin/testimonials");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update testimonial");
    },
  });
}

export function useDeleteTestimonialMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete<void>(`${TESTIMONIALS_API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial removed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove testimonial");
    },
  });
}
