import { BASE_URL, BRANDS } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useQuery } from "@tanstack/react-query";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  const name = queryKey[1] as string | undefined;
  const res = await AxiosApi.get(`${BASE_URL}/${BRANDS}`, {
    // params: { name },
  });
  void name;

  return res.data;
};

const useGetAllBrands = (name?: string) => {
  const query = useQuery({
    queryKey: ["Brandslist", name],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};
export default useGetAllBrands;
