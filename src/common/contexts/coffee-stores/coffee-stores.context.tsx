import {
  createContext,
  Dispatch,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import { THookReducerLike } from "@common/utils/hooks";

import * as coffeeStoreActions from "./coffee-store.actions";
import {
  coffeeStoresReducer,
  ICoffeeStoreReducer,
} from "./coffee-store.reducer";

type TDispatch = Dispatch<coffeeStoreActions.TCoffeeStoreActions>;
type TActions = Readonly<typeof coffeeStoreActions>;

const coffeeStoresContext = createContext<
  [ICoffeeStoreReducer, TDispatch] | undefined
>(undefined);

interface ICoffeeStoresProviderProps {
  children: React.ReactNode;
}

export const CoffeeStoreProvider: FunctionComponent<
  ICoffeeStoresProviderProps
> = ({ children }) => {
  const coffeeStoresInitialValue: ICoffeeStoreReducer = {
    coordinates: undefined,
    coffeeStores: [],
  };

  const reducer = useReducer(coffeeStoresReducer, coffeeStoresInitialValue);

  return (
    <coffeeStoresContext.Provider value={reducer}>
      {children}
    </coffeeStoresContext.Provider>
  );
};

export const useCoffeeStores = () => {
  const contextData = useContext(coffeeStoresContext);

  if (contextData === undefined) {
    throw new Error("useCoffeeStores must be used within CoffeeStoresProvider");
  }

  const [state, dispatch] = contextData;

  return {
    state,
    dispatch,
    actions: coffeeStoreActions,
  };
};
