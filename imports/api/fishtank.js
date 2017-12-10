import { Mongo } from 'meteor/mongo';
 
export const fishtank = new Mongo.Collection('fishtank');
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('fishtank', function fishtankPublication() {
    return fishtank.find({});
  });
}

// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'fishtank.upsert'(id, temp, waterLevel, light, servo) {

    fishtank.upsert({
    
    _id:id

    },
    {
      $set: {
        temp: temp,
        waterLevel: waterLevel,
        light: light,
        servo: servo,
        updatedAt: new Date(),
      }
    });
  }
})