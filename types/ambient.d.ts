declare module "axios" {
  type AxiosResponse<T = unknown> = {
    data: T
  }

  type AxiosConfig = {
    params?: Record<string, unknown>
    headers?: Record<string, string>
  }

  const axios: {
    create(config?: AxiosConfig & { baseURL?: string; withCredentials?: boolean }): {
      get<T = unknown>(url: string, config?: AxiosConfig): Promise<AxiosResponse<T>>
      post<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosConfig,
      ): Promise<AxiosResponse<T>>
      patch<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosConfig,
      ): Promise<AxiosResponse<T>>
      put<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosConfig,
      ): Promise<AxiosResponse<T>>
      delete<T = unknown>(url: string, config?: AxiosConfig): Promise<AxiosResponse<T>>
    }
    get<T = unknown>(url: string, config?: AxiosConfig): Promise<AxiosResponse<T>>
    post<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosConfig,
    ): Promise<AxiosResponse<T>>
    patch<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosConfig,
    ): Promise<AxiosResponse<T>>
  }

  export default axios
}

declare module "@tanstack/react-query" {
  export function useQuery<TData = unknown>(options: {
    queryKey: readonly unknown[]
    queryFn: (context: { queryKey: readonly unknown[] }) => Promise<TData>
    staleTime?: number
    refetchInterval?: number
    enabled?: boolean
    retry?: boolean | number
    placeholderData?: unknown
    refetchOnWindowFocus?: boolean
  }): {
    data: TData | undefined
    isLoading: boolean
    error: unknown
  }

  export function useMutation<TData = unknown, TVariables = unknown>(options: {
    mutationFn: (variables: TVariables) => Promise<TData>
    onSuccess?: (data: TData) => void
  }): {
    mutate: (variables: TVariables) => void
    isPending: boolean
  }

  export function useQueryClient(): {
    invalidateQueries: (options: { queryKey: readonly unknown[] }) => void
  }

  export const keepPreviousData: unknown
}
