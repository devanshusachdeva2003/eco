import { MongoClient } from "mongodb";
import dns from "node:dns";

// Fix for Windows DNS resolution issues with MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("DNS Servers set to:", dns.getServers());

const uri = process.env.Mongodb_Url;

if (!uri) {
  throw new Error("Please define the Mongodb_Url environment variable in .env");
}

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

declare global {
  // allow global cache across module reloads in development
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (global._mongoClientPromise) {
  cachedPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  cachedPromise = client.connect();
  // @ts-ignore
  global._mongoClientPromise = cachedPromise;
}

export default cachedPromise;
