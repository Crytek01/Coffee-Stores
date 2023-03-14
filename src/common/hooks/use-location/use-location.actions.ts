import { TActionFunction } from "@common/utils/reducers/actions/actions.util";

import { UseLocationTypes } from "./use-location.types";

export type TLocationAction =
  | { type: UseLocationTypes.LOCATION_START }
  | {
      type: UseLocationTypes.LOCATION_SUCCESS;
      payload: { latitude: number; longitude: number };
    }
  | { type: UseLocationTypes.LOCATION_FAILURE; payload: string }
  | { type: UseLocationTypes.LOCATION_RESET };

export const startLocationRequest: TActionFunction<
  void,
  TLocationAction
> = () => ({
  type: UseLocationTypes.LOCATION_START,
});

export const locationRequestSuccess: TActionFunction<
  {
    latitude: number;
    longitude: number;
  },
  TLocationAction
> = (payload) => ({
  type: UseLocationTypes.LOCATION_SUCCESS,
  payload,
});

export const locationRequestFailure: TActionFunction<
  string,
  TLocationAction
> = (payload) => ({
  type: UseLocationTypes.LOCATION_FAILURE,
  payload,
});

export const locationRequestReset: TActionFunction<
  void,
  TLocationAction
> = () => ({
  type: UseLocationTypes.LOCATION_RESET,
});
