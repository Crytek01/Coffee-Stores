export interface ICoffeeStore {
  fsq_id: string;
  location: Location;
  name: string;

  //Added properties at runtime
  imgUrl: string;
  voting: number;
}

interface CategoriesEntity {
  id: number;
  name: string;
  icon: Icon;
}

interface Icon {
  prefix: string;
  suffix: string;
}

interface Geocodes {
  main: Main;
}

interface Main {
  latitude: number;
  longitude: number;
}

interface Location {
  address: string;
  region?: string;
}

interface RelatedPlaces {}
