import express, { Request, Response } from "express";
const app = express();
const mongoose = require("mongoose");
const user_connection_url = "mongodb+srv://naacpDev:hack4impact2022@cluster0.dbyhj.mongodb.net/userDB?retryWrites=true&w=majority";

const User = require("./models/user");

mongoose.connect(user_connection_url)
.then(() => console.log('Successfully Connected'))
.catch((error: Error) => console.error(`Could not connect due to ${error}`))

app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  next();
});

app.use(express.json());

//get all users
app.get("/api/user", async (req: Request, res: Response) => {
  const users = await User.find({})
  res.send(users)
})

//console.log("Hello World!");

app.listen(4000);
