import { Mongo } from 'meteor/mongo';

 // create new Collection in Mongodb 
export const Tasks = new Mongo.Collection('tasks');
