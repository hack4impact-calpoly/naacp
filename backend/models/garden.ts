import {Schema, Model, Types} from 'mongoose';

'creating document interface for typescript'
interface User{
    name: string;
    description: string;
    location: string;
    pictures: Types.array<string>;
    gardeners: Types.array<string>;
    community: boolean;
    plants: Types.array<string>;
    date: Date;
}

'creating schema for gardens'
const schema = new Schema<User, Model<User>>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pictures:[String],
    gardeners: [String],
    community: { type: Boolean, required: true },
    plants: [String],
    date: { type: Date, required: true }
});
