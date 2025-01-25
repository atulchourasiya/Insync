import mongoose, { ConnectOptions } from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI as string;
    const dbName = process.env.DB_NAME as string;

    if (!dbUri || !dbName) {
      throw new Error("Database URI or name is not defined in environment variables");
    }

    const options: ConnectOptions = {
      dbName: dbName,
      autoIndex: true,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 60000,
    };

    await mongoose.connect(dbUri, options);
    console.log(`Database connected successfully`);
  } catch (err) {
    console.error(`DB could not connect due to [${(err as Error).message}]`);
    process.exit(1); // Exit the process with failure
  }
};