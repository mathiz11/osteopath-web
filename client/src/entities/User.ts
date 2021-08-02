import { Client } from "./Client";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  numberOA: string;
  phone: string;
  address: string;
  tokenVersion: number;
  clients: Client[];
};
