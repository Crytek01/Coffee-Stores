import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import { TActionFunction } from "@common/utils/reducers/actions/actions.util";

import { ECoffeeStoresTypes } from "./coffee-store.types";

export type TCoffeeStoreActions =
  | {
      type: ECoffeeStoresTypes.SET_COFFEE_STORES;
      payload: ICoffeeStore[];
    }
  | { type: ECoffeeStoresTypes.SET_COORDINATES; payload: string };

export const setCoffeeStores: TActionFunction<
  ICoffeeStore[],
  TCoffeeStoreActions
> = (payload) => ({
  type: ECoffeeStoresTypes.SET_COFFEE_STORES,
  payload,
});

export const setCoordinates: TActionFunction<string, TCoffeeStoreActions> = (
  payload
) => ({
  type: ECoffeeStoresTypes.SET_COORDINATES,
  payload,
});
