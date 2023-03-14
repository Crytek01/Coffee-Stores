import { useReducer } from "react";

import {
  locationRequestFailure,
  locationRequestSuccess,
  startLocationRequest,
} from "./use-location.actions";
import { ILocationState, locationReducer } from "./use-location.reducer";

interface IUseLocation extends PositionOptions {}

const initialLocationState: ILocationState = {
  isRequestingLocation: false,
  coordinates: undefined,
  errorMessage: undefined,
};

export const useLocation = (options?: IUseLocation) => {
  const [state, dispatch] = useReducer(locationReducer, initialLocationState);

  const onSuccess = ({ coords }: GeolocationPosition) => {
    const { latitude, longitude } = coords;
    dispatch(locationRequestSuccess({ latitude, longitude }));
  };

  const onFailure = () => {
    dispatch(locationRequestFailure("Unable to retrieve your location."));
  };

  const requestLocation = async () => {
    dispatch(startLocationRequest());

    if (!navigator.geolocation) {
      return dispatch(
        locationRequestFailure("Geolocation is not supported by your browser.")
      );
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onFailure, options);
  };

  const { isRequestingLocation, coordinates, errorMessage } = state;

  return {
    isRequestingLocation,
    coordinates,
    requestLocation,
    errorMessage,
  };
};
