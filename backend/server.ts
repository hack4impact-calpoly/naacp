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
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

//get all users
app.get("/users", async (req: Request, res: Response) => 
{
  const users = await User.find({});
  res.send(users)
})

//get all Gardens
app.get("/gardens", async (req:Request , res:Response) => {
  const gardens = await Garden.find({})
  res.send(gardens)
})

//gets user by id
app.get("/users/:id", async (req: Request, res: Response) => 
{
  const user = await User.findOne({id: req.params.id})
  res.send(user)
})

//add new user to the DB
app.post("/users", async (req: Request, res: Response) => 
{
  try
  {
    const { first_name, last_name, description, phone, email, picture, gardens, saved } = req.body;
    const newUser = new User({
      first_name,
      last_name,
      description,
      phone,
      email,
      picture,
      gardens,
      saved
    });
    await newUser.save();
    res.send(`${ first_name } ${ last_name } added to the collection`);
  }
  catch(error)
  {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(message);
    res.status(400).send(message);
    console.log(`error: ${ message }`)
  }
})

app.put("/users/:id", async (req: Request, res: Response) =>
{
  try
  {
    let user = await User.findOne({ _id: req.params.id });

    if (req.body.phone) {user.phone = req.body.phone;}
    if (req.body.email) {user.email = req.body.email;}
    if (req.body.first_name) {user.first_name = req.body.first_name;}
    if (req.body.last_name) {user.last_name = req.body.last_name;}
    if (req.body.description) {user.description = req.body.description;}
    if (req.body.picture) {user.picture = req.body.picture;}
    if (req.body.gardens) {user.gardens = req.body.gardens;}
    if (req.body.saved) {user.saved = req.body.saved;}

    await user.save();
    res.send(`successfully updated user with id ${req.params.id}`);
  }
  catch(error)
  {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(message);
    res.status(400).send(message);
    console.log(`error: ${ message }`)
  }
})


app.listen(4000);
