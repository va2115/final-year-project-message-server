const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const SockJS = require('sockjs-client');
const stomp = require('@stomp/stompjs');



const port = new SerialPort('COM8', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data


var socket = new SockJS('http://20.198.64.187:8080/stomp-endpoint');
var stompClient = stomp.Stomp.over(socket);
stompClient.connect({}, (frame) => {
  console.log('Connection Successful.');
});


parser.on('data', data => {
  stompClient.send('/app/send-reading', {}, JSON.stringify({ 'timestamp': Date.now(), 'reading': data }));
  console.log(data);
});