import * as dotenv from "dotenv";

dotenv.config();

export function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }

  return value;
}
