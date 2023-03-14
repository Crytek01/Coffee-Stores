import {
  coffeeStoreTable,
  getCoffeeStoreById,
  getMinifiedRecord,
  transformAirtableDataToCoffeeStoreModel,
} from "@common/lib/airtable";
import { IAirtableCoffeeStore } from "@common/lib/airtable/models/coffee-store.model";
import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import { TServerlessFunction } from "@common/utils/api/api.utils";

const getCoffeeStoreByIdHandler: TServerlessFunction<ICoffeeStore> = async (
  req,
  res
) => {
  const id = req.query.id?.toString() ?? "";

  try {
    const coffeeStoreInDB = await getCoffeeStoreById(id);

    if (!coffeeStoreInDB) {
      return res.status(404).json({
        status: "Failure",
        message: "Provided id doesn't match with any coffee store.",
      });
    }

    const { data } = coffeeStoreInDB;

    res.status(200).json({
      status: "Success",
      data: transformAirtableDataToCoffeeStoreModel(data),
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Something went wrong fetching the coffee store.",
    });
  }
};

const updateCoffeeStoreVotesByIdHandler: TServerlessFunction<ICoffeeStore> = async (
  req,
  res
) => {
  try {
    const id = req.query.id?.toString() ?? "";

    const coffeeStoreInDB = await getCoffeeStoreById(id);

    if (!coffeeStoreInDB) {
      return res.status(404).json({
        status: "Failure",
        message: "Failed to find a coffee store with that id.",
      });
    }

    const { recordId, data: coffeeStoreData } = coffeeStoreInDB;

    const updatedRecord = await coffeeStoreTable.update(recordId, {
      voting: (coffeeStoreData.voting ?? 0) + 1,
    });

    const updatedCoffeeStore = getMinifiedRecord<IAirtableCoffeeStore>([
      updatedRecord,
    ]);

    if (!updatedCoffeeStore) {
      throw new Error();
    }

    res.status(200).json({
      status: "Success",
      data: transformAirtableDataToCoffeeStoreModel(updatedCoffeeStore.data),
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Failed to update voting count.",
    });
  }
};

const defaultHandler: TServerlessFunction<any> = async (...context) => {
  const [request, response] = context;

  const requestMethod = request.method;

  if (requestMethod === "GET") {
    return await getCoffeeStoreByIdHandler(...context);
  }

  if (requestMethod === "PUT") {
    return await updateCoffeeStoreVotesByIdHandler(...context);
  }

  response.status(405).json({
    status: "Failure",
    message: "Method is not allowed.",
  });
};

export default defaultHandler;
