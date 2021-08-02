import { Animal } from "./Animal";

export type Client = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
  animals: Animal[];
};
