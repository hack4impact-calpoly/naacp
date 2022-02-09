import express, { Request, Response, NextFunction } from "express";
import User from "./models/user";
const app = express();
import Gardens from './models/garden';


app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  next();
});

app.use(express.json());

//test endpoint
app.get('/', (req, res) => {
  res.send('Hello world!')
})

//get all users
app.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find({});
  res.send(users)
})

//get all Gardens
app.get("/api/gardens", async (req:Request , res:Response) => {
  const gardens = await Gardens.find({})
  res.send(gardens)
})

app.listen(4000);
