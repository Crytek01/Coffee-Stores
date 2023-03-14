import { unsplash } from "../unsplash/unsplash.service";

import { ICoffeeStore } from "./coffee-stores.model";

interface IQueryPlaceAPI {
  lat: string;
  lng: string;
  searchKeyword: string;
  radius?: number;
  limit?: number;
}

const getQueryPlaceAPI = ({
  lat,
  lng,
  searchKeyword,
  radius = 65,
  limit = 6,
}: IQueryPlaceAPI) => {
  return `https://api.foursquare.com/v3/places/search?query=${searchKeyword}&ll=${lat}%2C${lng}&radius=${radius}&limit=${limit}`;
};

const getCoffeeStorePhotos = async (quantity: number) => {
  if (quantity === 0) {
    return [];
  }

  const photosResponse = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: quantity,
  });

  if (photosResponse.errors) {
    throw new Error("Cannot fetch photos for coffee shops.");
  }

  return photosResponse.response.results.map(({ urls }) => urls.regular);
};

export const fetchCoffeeStores = async (
  coordinates: string = "9.934017,-84.079702",
  radius: number = 65,
  limit: number = 6
): Promise<ICoffeeStore[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ?? "",
    },
  };

  const [latitude, longitude] = coordinates.split(",");

  try {
    const response = await fetch(
      getQueryPlaceAPI({
        lat: latitude,
        lng: longitude,
        searchKeyword: "cafe",
        limit,
        radius,
      }),
      options
    );

    if (!response.ok) {
      return [];
    }

    const coffeeShops: ICoffeeStore[] = (await response.json())?.results ?? [];

    const photos = await getCoffeeStorePhotos(coffeeShops.length);

    return coffeeShops.map((coffeeShop, index) => {
      coffeeShop["imgUrl"] =
        photos.at(index) ??
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";

      return coffeeShop;
    });
  } catch (e) {
    return [];
  }
};

export default fetchCoffeeStores;
