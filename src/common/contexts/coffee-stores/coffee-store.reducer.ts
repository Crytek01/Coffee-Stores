import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";

import { TCoffeeStoreActions } from "./coffee-store.actions";
import { ECoffeeStoresTypes } from "./coffee-store.types";

export interface ICoffeeStoreReducer {
  coordinates: string | undefined;
  coffeeStores: ICoffeeStore[];
}

export const coffeeStoresReducer = (
  state: ICoffeeStoreReducer,
  action: TCoffeeStoreActions
): ICoffeeStoreReducer => {
  const { type, payload } = action;

  switch (type) {
    case ECoffeeStoresTypes.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: payload,
      };
    }

    case ECoffeeStoresTypes.SET_COORDINATES: {
      return {
        ...state,
        coordinates: payload,
      };
    }

    default:
      return state;
  }
};
