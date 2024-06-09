import { MongoClient, Db } from 'mongodb';

// Replace the following with your MongoDB connection string
const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

async function connectDB(): Promise<Db> {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('todo-app'); // Replace with your database name
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
    process.exit(1)
  }
}

export default connectDB;
