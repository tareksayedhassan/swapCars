import { BASE_URL, OFFERS } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useQuery } from "@tanstack/react-query";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  const [, categoryName, debouncedSearch, pageIndex, pageSize] = queryKey;
  const res = await AxiosApi.get(`${BASE_URL}/${OFFERS}`, {
    params: {
      categoryName: categoryName as string | undefined,
      title: debouncedSearch as string | undefined,
      pageNumber: pageIndex as number | undefined,
      pageSize: pageSize as number | undefined,
    },
  });
  return res.data;
};

const useGetOffers = (
  categoryName?: string,
  debouncedSalonSearch?: string,
  pageNumber?: number,
  pageSize?: number,
) => {
  const query = useQuery({
    queryKey: [
      "offerslist",
      categoryName,
      debouncedSalonSearch,
      pageNumber,
      pageSize,
    ],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};
export default useGetOffers;
