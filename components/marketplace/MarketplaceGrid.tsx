import Pagention from "../pagention";
import CarCard from "./CarCard";
import { AccessoryCard } from "./AccessoriesCard";
import RealEstateCard from "./RealEstateCard";
import useGetCars from "@/hooks/Cars/useGetCars";
import useGetRealEstate from "@/hooks/RealEstate/useGetRealEstate";
import { useMemo, useState } from "react";
import useGetAccessories from "@/hooks/Accessories/useGetAccessories";
import { useFilters } from "@/store/useFilter";

export default function MarketplaceGrid({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) {
  const { filters } = useFilters();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  const { data } = useGetCars({
    year: filters.year,
    brandName: filters.brand,
    condition: filters.condition,
    fuel_type: filters.fuelType,
    transmission: filters.transmission,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  const cars = data?.data;
  const { data: realEstateData } = useGetRealEstate({
    purpose: filters.purpose,
    realEstatetype: filters.propertyType,
    bedrooms: filters.rooms,
    bathrooms: filters.bathrooms,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  const realEstates = realEstateData?.data;

  const { data: accessoriesData } = useGetAccessories({
    category: filters.category,
    material: filters.material,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  const accessories = useMemo(
    () => accessoriesData?.data || [],
    [accessoriesData],
  );
  const totalItems = useMemo(() => {
    if (filters.type === "cars") {
      return data?.totalItems;
    } else if (filters.type === "accessories") {
      return accessoriesData?.totalItems;
    } else {
      return realEstateData?.totalItems;
    }
  }, [filters.type, data, accessoriesData, realEstateData]);
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {filters.type === "cars"
          ? cars?.map((car: any) => (
              <CarCard key={car.id} car={car} variant={viewMode} />
            ))
          : filters.type === "accessories"
            ? accessories?.map((accessory: any) => (
                <AccessoryCard
                  key={accessory.id}
                  accessory={accessory}
                  variant={viewMode}
                />
              ))
            : realEstates?.map((realEstate: any) => (
                <RealEstateCard
                  key={realEstate.id}
                  item={realEstate}
                  variant={viewMode}
                />
              ))}
      </div>

      <Pagention
        totalItems={totalItems}
        currentPage={pageNumber}
        setCurrentPage={setPageNumber}
        rowsPerPage={pageSize}
      />
    </div>
  );
}
