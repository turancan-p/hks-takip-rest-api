import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 4000;

export const config = {
  ports: {
    baseApp: SERVER_PORT,
  },
};
