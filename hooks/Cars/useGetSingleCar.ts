import { BASE_URL, CARS } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type QueryContext = { queryKey: readonly unknown[] };

const fetchData = async ({ queryKey }: QueryContext) => {
  const id = queryKey[1] as number;
  const res = await axios.get(`${BASE_URL}/${CARS}/${id}`);
  return res.data;
};
const useGetSingleCar = (id: number) => {
  const query = useQuery({
    queryKey: ["Carslist", id],
    queryFn: fetchData,
    enabled: !!id,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};
export default useGetSingleCar;
