import { config } from "./config";

const COOKIE_NAME = "authToken";

const url = config.MONGO_URI;

const DbName = "todos-app";

export { COOKIE_NAME, url, DbName };
