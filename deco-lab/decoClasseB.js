

export class B
{

    constructor()
    {
        console.log('constructor B');
    }

    welcome()
    {
        console.log('Class B');
    }
}




io.on("connection", (socket) => {
  socket.use(([event, ...args], next) => {
    if (isUnauthorized(event)) {
      return next(new Error("unauthorized event"));
    }
    next();
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});
