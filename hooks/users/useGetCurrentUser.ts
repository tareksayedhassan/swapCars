import { BASE_URL, USERS } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  void queryKey;
  try {
    const res = await AxiosApi.get(`${BASE_URL}/${USERS}/current-user`);
    return res.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { status?: number } }).response?.status === 403
    ) {
      return null;
    }
  }
};

const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: ["userlist"],
    queryFn: fetchData,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  });
  return query;
};
export default useGetCurrentUser;
