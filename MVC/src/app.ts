import express from 'express'
import session from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import { connectDB } from './utils/db'
import { IUser } from './models/userModel'
import dotenv from 'dotenv'
import { createServer } from "http";
import { Server } from "socket.io";


// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});


const app = express()
const PORT = process.env.PORT || 3000
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, "js")));


// Session Config
declare module 'express-session' {
  interface SessionData {
    item: IUser
  }
}
const sessionConfig = session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    /*
    cookie: {
        httpOnly: true,
        secure: true,        // HTTPS zorunlu
        sameSite: "strict",  // CSRF için çok önemli
        maxAge: 1000 * 60 * 30 // 30 dakika
    }
    */
})
app.use(sessionConfig)
// Socket.IO ile session paylaşımı
io.engine.use((req: any, res: any, next: any) => {
  sessionConfig(req, res, next);
});


// DB Config
connectDB()

// EJS Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// imports controllers
import { userController } from './controllers/userController'
import { dashboardController } from './controllers/dashboardController'
import { sessionControl } from './utils/sessionControl'
import { profileController } from './controllers/profileController'

// Global Filter

// Controllers
app.use(userController)
app.use(sessionControl, dashboardController)
app.use(sessionControl, profileController)

// Socket.IO Connection
io.on("connection", (socket) => {
  // session control
  const req = socket.request as express.Request;
  if (!req.session.item) {
    console.log("unauthorized user tried to connect via socket");
    socket.disconnect();
    return;
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg:string) => {
    io.emit("chat message", { user: req.session.item.name, message: msg });
  });

});


server.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})

