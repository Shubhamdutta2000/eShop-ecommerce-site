import mongoose from "mongoose";

//////////////////// SAMPLE DATAS    /////////////////////////////

import productsData from "./data/products.js";
import usersData from "./data/users.js";

///////////////////   config   ////////////////////////////
import connectDB from "./config/db.js";
import dotenv from "dotenv";

//////////////////   MODELS    /////////////////////////////

import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productsModel.js";

////////   Loads .env file contents into | process.env
dotenv.config();

////////   Connect database
connectDB();

///////////////////////    ADD ALL SAMPLE DATAS TO DATABASE   //////////////////////////////

const importData = async () => {
  try {
    // Delete All previous data on database
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    // Seed all sample data into database

    // User data inserted to database
    const createdUser = await User.insertMany(usersData);

    // return admin user
    const adminUser = createdUser[0]._id;

    // add admin user to each sample product
    const sampleProducts = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    // Product data inserted to database
    await Product.insertMany(sampleProducts);

    console.log(`Data imported successfully `);

    process.exit();
  } catch (error) {
    console.log(`ERROR in importing: ${error}`);
    process.exit(1);
  }
};

/////////////////////     DELETE ALL DATA FROM DATABASE   /////////////////////////

const deleteData = async () => {
  try {
    // Delete All previous data on database
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    console.log(`Data deleted successfully `);

    process.exit();
  } catch (error) {
    console.log(`ERROR in deleting: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  deleteData();
} else {
  importData();
}
