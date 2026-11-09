

const { Server } = require("socket.io");

const io = new Server({});




io.on("connection", (socket) =>
{
  console.log(`Client Id : ${socket.id}`);
  socket.on("echo:reply", (data) =>
  {
    console.log(`Server send me data ${data}`);
  });
  socket.emit("echo:reply", "Hello I Am Client");
  io.socketsJoin("room1");
  socket.join("room1");


  socket.emit("hello1");

});


io.on("connection", (socket) => {
  socket.join("some room");
  io.to("some room").emit("some event", "Hello");
});


io.on("connection", (socket) => {
  socket.to("some room").emit("some event");
});


function computeUserIdFromHeaders(headers) {
  // to be implemented
}

io.on("connection", async (socket) => {
  const userId = await computeUserIdFromHeaders(socket.handshake.headers);

  socket.join(userId);

  // and then later
  io.to(userId).emit("hi");
});


io.on("connection", async (socket) => {
  const projects = await fetchProjects(socket);

  projects.forEach(project => socket.join("project:" + project.id));

  // and then later
  io.to("project:4321").emit("project updated");
});



io.on("connection", socket => {
  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
  });
});



// server A
io.on("connection", (socket) => {
  socket.data.username = "alice";
});

// server B
const sockets = await io.fetchSockets();
console.log(sockets[0].data.username); // "alice"



io.on("connection", (socket) => {
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
});


io.listen(3001);