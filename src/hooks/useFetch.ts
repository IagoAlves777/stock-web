import { AxiosRequestConfig } from 'axios';
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr';

import api from '../services/api';

const fetcher = async (url: string, params?: AxiosRequestConfig) => {
  const response = await api.get(url, params);

  return response?.data?.resource || response?.data;
};

interface Fetch<Data, Error> {
  data: Data | undefined;
  error: Error | undefined;
  isValidating: boolean;
  mutate: KeyedMutator<Data>;
}

function useFetch<Data = any, Error = any>(
  url: string | null,
  options?: SWRConfiguration<Data, Error>,
  params?: AxiosRequestConfig,
): Fetch<Data, Error> {
  const { data, error, isValidating, mutate } = useSWR<Data, Error>(url, (uri) => fetcher(uri, params), {
    focusThrottleInterval: 2 * 60 * 1000, // 2 minutes
    errorRetryCount: 5,
    shouldRetryOnError: true,
    revalidateOnMount: true,
    ...options,
  });

  return { data, error, isValidating, mutate };
}

export default useFetch;
