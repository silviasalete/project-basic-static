import { City } from './city';
import { Country } from './country';

export interface Company {
  id: number;
  nome: string;
  country: Country;
  city: City;
}
