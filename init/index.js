const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/Fernweh";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(async() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6aa39bc87ac1ad7710069a6f"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();