import { BASE_URL, BOOKING } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { BookingData } from "@/validations/zod.Schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Request = {
  quantity?: number;
  watsapp: string;
  phone?: string;
  monthlyInstallment: number;
  email: string;
  itemType: string;
  itemId: number;
  documentType: BookingData["documentType"] | null;
  documentFront?: File;
  documentBack?: File;
  salaryProof?: File;
};
export const useBooking = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Request | FormData }) =>
      AxiosApi.post(`${BASE_URL}/${BOOKING}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => res.data),

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["bookingList"] });
    },
  });
};
