import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";

import { coffeeStoreTable, findRecords, getMinifiedRecord } from "../..";
import { IAirtableCoffeeStore } from "../../models/coffee-store.model";

export const transformAirtableDataToCoffeeStoreModel = (
  model: IAirtableCoffeeStore
): ICoffeeStore => ({
  fsq_id: model.id,
  name: model.name,
  location: {
    address: model.address,
    region: model.region,
  },
  imgUrl: model.imgUrl,
  voting: model.voting,
});

export const transformCoffeeStoreModelToAirtableData = (
  model: ICoffeeStore
): IAirtableCoffeeStore => ({
  id: model.fsq_id,
  name: model.name,
  address: model.location.address,
  region: model.location.region,
  imgUrl: model.imgUrl,
  voting: model.voting,
});

export const getCoffeeStoreById = async (id: string) => {
  const records = await findRecords<IAirtableCoffeeStore>({
    tableModel: coffeeStoreTable,
    filter: `id="${id}"`,
    maxQuantity: 1,
  });

  return getMinifiedRecord<IAirtableCoffeeStore>(records);
};

export const getCoffeeStores = async (maxQuantity?: number) =>
  await findRecords({ tableModel: coffeeStoreTable, maxQuantity });
