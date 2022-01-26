import {Schema, Model, Types} from 'mongoose';
import {gardenConnection} from '../connection'

'creating document interface for typescript'
interface IGarden{
    name: string;
    description: string;
    location: string;
    pictures: Types.Array<string>;
    gardeners: Types.Array<string>;
    community: boolean;
    plants: Types.Array<string>;
    date: Date;
}

'creating schema for gardens'
const schema = new Schema<IGarden, Model<IGarden>>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    pictures:[String],
    gardeners: [String],
    community: { type: Boolean, required: true },
    plants: [String],
    date: { type: Date, required: true }
});

const Garden = gardenConnection.model('gardenDB', schema)
export default Garden;