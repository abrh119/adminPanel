import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://abdrlk:abdrlk@cluster0.dt1lfci.mongodb.net/?retryWrites=true&w=majority";
let client;

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err);
    }
  }
}

export default async function handler(req, res) {
  await connectToDatabase();
  try {
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
    }

    const db = client.db('detoxify');
    const collection = db.collection('comments');

    const comments = await collection.find().toArray();

    res.status(200).json({ data: comments });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}