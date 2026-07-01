export function useFilters() {
  return {
    filters: {},
    setFilter: (_filters: Record<string, string>) => {
      void _filters
    },
    clearFilters: () => undefined,
  }
}
