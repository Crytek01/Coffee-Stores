import {
  coffeeStoreTable,
  getCoffeeStoreById,
  getMinifiedRecord,
  transformAirtableDataToCoffeeStoreModel,
  transformCoffeeStoreModelToAirtableData,
} from "@common/lib/airtable";
import { IAirtableCoffeeStore } from "@common/lib/airtable/models/coffee-store.model";
import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import { TServerlessFunction } from "@common/utils/api/api.utils";
import { Nullable } from "unsplash-js/dist/helpers/typescript";

const createCoffeeStore: TServerlessFunction<ICoffeeStore> = async (
  req,
  res
) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "Failure",
      message: "Method not allowed",
    });
  }

  try {
    const body: Nullable<ICoffeeStore> = JSON.parse(req.body);

    if (!body) {
      return res.status(400).json({
        status: "Failure",
        message: "Please send a valid body",
      });
    }

    if (!body.fsq_id || !body.name) {
      return res.status(400).json({
        status: "Failure",
        message: "fsq_id or name missing.",
      });
    }

    const coffeeStoreInDB = await getCoffeeStoreById(body.fsq_id);

    if (coffeeStoreInDB) {
      return res.json({
        status: "Success",
        data: transformAirtableDataToCoffeeStoreModel(coffeeStoreInDB.data),
      });
    }

    const createdCoffeeStoreRecords = await coffeeStoreTable.create([
      {
        fields: transformCoffeeStoreModelToAirtableData(body) as object,
      },
    ]);

    const createdCoffeeStore = getMinifiedRecord<IAirtableCoffeeStore>(
      createdCoffeeStoreRecords
    );

    if (!createdCoffeeStore) {
      throw new Error(
        "Something went wrong retrieving the created coffee store."
      );
    }

    res.status(201).json({
      status: "Success",
      data: transformAirtableDataToCoffeeStoreModel(createdCoffeeStore.data),
    });
  } catch (e) {
    throw res.status(500).json({
      status: "Failure",
      message: "Error creating or finding store.",
    });
  }
};

export default createCoffeeStore;
