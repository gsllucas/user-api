import mongoose from 'mongoose';

export default class AppDatabase {
  constructor() {}

  connect() {
    return mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@main-cluster.90cxaxi.mongodb.net/?retryWrites=true&w=majority`
    );
  }
}
