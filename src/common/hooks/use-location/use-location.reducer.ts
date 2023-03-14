import { TLocationAction } from "./use-location.actions";
import { UseLocationTypes } from "./use-location.types";

export interface ILocationState {
  isRequestingLocation: boolean;
  coordinates: string | undefined;
  errorMessage: string | undefined;
}

export const locationReducer = (
  state: ILocationState,
  action: TLocationAction
): ILocationState => {
  switch (action.type) {
    case UseLocationTypes.LOCATION_START: {
      return { ...state, isRequestingLocation: true };
    }

    case UseLocationTypes.LOCATION_SUCCESS: {
      const { latitude, longitude } = action.payload;
      return {
        ...state,
        errorMessage: undefined,
        coordinates: `${latitude},${longitude}`,
        isRequestingLocation: false,
      };
    }
    case UseLocationTypes.LOCATION_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        coordinates: undefined,
        isRequestingLocation: false,
      };
    }

    case UseLocationTypes.LOCATION_RESET: {
      return {
        errorMessage: undefined,
        coordinates: undefined,
        isRequestingLocation: false,
      };
    }

    default:
      return state;
  }
};
