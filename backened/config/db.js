import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      `MongoDb Connected Successfully: ${connect.connection.host}`.cyan
        .underline.bold
    );
  } catch (error) {
    console.log(
      `Error while connecting to DB: ${error.message}`.brightRed.underline
        .italic
    );
    process.exit(1);
  }
};

export default dbConnect;
