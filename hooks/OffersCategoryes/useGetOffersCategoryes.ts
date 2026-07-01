import { BASE_URL, OFFERS_CATEGORYES } from "@/service/apis";
import AxiosApi from "@/utils/AxiosApi";
import { useQuery } from "@tanstack/react-query";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  const name = queryKey[1] as string | undefined;
  const res = await AxiosApi.get(`${BASE_URL}/${OFFERS_CATEGORYES}`, {
    // params: { name },
  });
  void name;

  return res.data;
};

const useGetOffersCategoryes = (name: string) => {
  const query = useQuery({
    queryKey: ["OffersCategoryeslist", name],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};
export default useGetOffersCategoryes;
