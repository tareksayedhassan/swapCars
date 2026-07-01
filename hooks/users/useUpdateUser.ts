import { BASE_URL, USERS } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: FormData }) =>
      AxiosApi.patch(`${BASE_URL}/${USERS}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => res.data),

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["userlist"] });
    },
  });
};
