import { useEffect, useState } from "react";

const useDebouncedSearch = (search: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);
  return { debouncedSearch };
};

export default useDebouncedSearch;
