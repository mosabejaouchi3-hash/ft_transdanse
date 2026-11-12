
const { error } = require("console");
const { io } = require("socket.io-client");

const args = process.argv;
let joinOrno = true;


const userId = args[2];
const roomId = args[3];
console.log(process.argv.length);
if (process.argv.length === 5)
{
  joinOrno = false;
}

const socket = io("http://localhost:3001", { auth: { userId: userId} });


socket.on("connect", () => {
  

});

socket.on("connect_error", (error) => {
  if (socket.active) {
    console.log("I a active");
    console.log("connect_error");

    } else {
    console.log(error.message);
    console.log("connect_error");
  }
});

socket.on("disconnect", (reason) => {
  if (socket.active) {
    console.log("I a active");
    console.log("disconnect");
  } else {
    console.log(reason);
    console.log("disconnect");
  }
});
if (joinOrno)
{
  console.log("I join");
  // socket.emit('room:join', roomId);
}

const msg = `Hello ${userId}`;

socket.emit(
  'chat:send',
  { roomId: roomId, msg: 'Hi I Am ' + userId },
  (response) => {
    if (response.status === 'sent') {
      console.log('Message confirmed & saved:', response.data);
    } else {
      console.log('Failed to send:');
    }
    console.log("Failed to send 1");
  },
);

socket.on('chat:send', (message) =>
{
  console.log('New message received from room:', message);
});


socket.on('user:left', (data) =>
{
  console.log(`User ${data.userId} Leave from room ${data.roomId}`);
});