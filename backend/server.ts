import express, { Request, Response, NextFunction } from "express";
import User from "./models/user";
const app = express();
import Garden from './models/garden';


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
app.get("/gardens", async (req:Request , res:Response) => {
  const gardens = await Garden.find({})
  res.send(gardens)
})

//updates a garden
app.put("/gardens/:id", async (req:Request, res: Response) => {
  const GardenName = req.params.name;
  const description = req.body.description;
  const pictures = req.body.pictures;
  const gardeners = req.body.gardeners;
  const community = req.body.community;
  const plants = req.body.plants;
  const date = req.body.date;
  const garden = await Garden.findOne({name:GardenName})
 try{
   garden.name.push(GardenName)
   garden.description.push(description)
   garden.pictures.push(pictures)
   garden.gardeners.push(gardeners)
   garden.community.push(community)
   garden.plants.push(plants)
   garden.date.push(date)
   await garden.save()
   res.send('garden sucessfully updated')
 }
 catch(error){
   res.status(500).send(error)
   console.error(`Could not update garden due to ${error}`)
 }
 })

app.listen(4000);
