import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    console.log("ready state: ", mongoose.connection.readyState);

    mongoose.connection.readyState;
    await mongoose
      .connect(process.env.MONGOURI!)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log(error);
        console.log("database connection error");
      });
    console.log("ready state: ", mongoose.connection.readyState);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
