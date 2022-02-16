import express, { Request, Response, NextFunction } from "express";
import User from "./models/user";
const app = express();

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


app.listen(4000);
