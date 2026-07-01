import { useFilters } from "@/store/useFilter";

export const useApplyFilter = () => {
  const { setFilter } = useFilters();

  const handleFilter = (filterValue: string, itemType: string) => {
    const filterConfigs: Record<string, Record<string, string>> = {
      cars: { type: "cars", condition: filterValue, brand: filterValue },
      "real-estate": { type: "real-estate", propertyType: filterValue },
      accessories: {
        type: "accessories",
        material: filterValue,
        category: filterValue,
      },
    };

    const config = filterConfigs[itemType] || { type: "all" };

    setFilter(config);
    window.location.assign("/MarketPlace");
  };

  return { handleFilter };
};
