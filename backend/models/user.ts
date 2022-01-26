import { Schema} from 'mongoose';
import { userConnection } from '../connection';

interface user {
    first_name: string;
    last_name: string;
    description: string;
    phone: string;
    email: string;
    picture: string;
    gardens: [string];
    saved: [string];
    plants: [string];
  }

const userSchema = new Schema<user>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, requried: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    gardens: { type: [String], required: true },
    saved: { type: [String], required: true },
    plants: { type: [String], required: true },
  });

  const User = userConnection.model('userDB', userSchema)
  export default User;