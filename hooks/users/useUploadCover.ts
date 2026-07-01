import { BASE_URL, USERS } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadCover = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      AxiosApi.post(`${BASE_URL}/${USERS}/upload-cover`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => res.data),

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["userlist"] });
    },
  });
};
