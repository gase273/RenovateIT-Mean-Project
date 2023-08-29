import { Review } from "./review";

export class User {
  username: string;
  password: string;
  phone: string;
  email: string;
  img: string;
  type: number;
  status: string;
  firstName: string;
  lastName: string;
  agencyName: string;
  address: string;
  pib: number;
  desc: string;
  allowedWorkers: number;
  reviews: Review[];
}
