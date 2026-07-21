import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { getEnv } from "../env/envloader";

dotenv.config();

export class UserData {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly phoneNumber: string;
  readonly ssn: number;
  readonly username: string;
  readonly password: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.address = faker.location.streetAddress();
    this.city = faker.location.city();
    this.state = faker.location.state();
    this.zipCode = faker.location.zipCode();
    this.phoneNumber = faker.phone.number({ style: 'international' })
    this.ssn = faker.number.int({ min: 10000000, max: 999999999 });
    this.username = this.firstName.substring(0,4).concat(this.lastName.toLowerCase().substring(0,3)).concat(this.phoneNumber.substring(2,4));
    this.password = getEnv("PARABANK_NEW_PASSWORD");
  }
}