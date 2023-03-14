import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import {
  APIResponseFailure,
  APIResponseSuccess,
} from "@common/utils/api/api.utils";
import { fetcher } from "@common/utils/swr";
import useSWR, { SWRConfiguration } from "swr";

export const useCoffeeStore = (
  id: string,
  fallbackData: ICoffeeStore,
  options?: Omit<SWRConfiguration, "fallbackData">
) => {
  return useSWR<APIResponseSuccess<ICoffeeStore>, APIResponseFailure>(
    `/api/coffee-stores/${id}`,
    fetcher,
    {
      ...options,
      fallbackData: {
        status: "Success",
        data: fallbackData,
      },
    }
  );
};
