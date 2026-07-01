import { BASE_URL, FINANCING } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFinancin = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Request | FormData }) =>
      AxiosApi.post(`${BASE_URL}/${FINANCING}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => res.data),

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["FinancinList"] });
    },
  });
};
