export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  numberOA: string;
  phone: string;
  address: string;
  tokenVersion?: number;
};
