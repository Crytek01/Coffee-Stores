import Airtable from "airtable";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_COFFEE_STORES_BASE_KEY ?? "");

export const coffeeStoreTable = airtable("Coffee Stores");

export * from "./helpers/index";
