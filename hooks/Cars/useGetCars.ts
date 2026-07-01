import { BASE_URL, CARS } from "@/service/apis";
import { CarQueryFilters } from "@/types/CarQueryFilters";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  const params = queryKey[1] as CarQueryFilters | undefined;
  const res = await axios.get(`${BASE_URL}/${CARS}`, {
    params: params,
  });

  return res.data;
};
const useGetCars = (params?: CarQueryFilters) => {
  const query = useQuery({
    queryKey: ["Carslist", params],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};
export default useGetCars;
