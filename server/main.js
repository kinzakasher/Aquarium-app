import { Meteor } from 'meteor/meteor';
import SerialPort from 'serialport';
import fishtank from '../imports/api/fishtank.js'

let currentFishtank = null

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

// parse the data from serial into meaningful objects
function onData(data) {
  // console.log(data);
  // split into an array 
  let dataArr  = data.split(",");
  console.log(dataArr);


}

var port = new SerialPort('/dev/cu.usbmodem1451', {
  baudRate: 9600
});
port.pipe(parser);
// our callback function must be wrapped in Meteor.bindEnvironment to avoid Fiber errors
parser.on('data', Meteor.bindEnvironment(onData));


Meteor.startup(() => {
  // code to run on server at startup
});