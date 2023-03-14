import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import fetchCoffeeStores from "@common/lib/coffee-stores/coffee-stores.service";
import { TServerlessFunction } from "@common/utils/api/api.utils";

const getByLocation: TServerlessFunction<ICoffeeStore[]> =
  async function getByLocation(req, res) {
    try {
      const { coordinates, limit } = req.query;

      const coffeeStores = await fetchCoffeeStores(
        coordinates?.toString(),
        5000,
        parseInt(limit?.toString() ?? "6", 10)
      );

      res.status(200).json({
        status: "Success",
        data: coffeeStores,
        size: coffeeStores.length,
      });
    } catch (e) {
      res.status(500).json({
        status: "Failure",
        message: "Oh no! Something went wrong.",
      });
    }
  };

export default getByLocation;
