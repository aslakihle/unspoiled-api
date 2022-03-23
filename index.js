
const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://192.168.0.238:8000");
//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,content-type,set-cookie"
//   );
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });






app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Login routes
app.use('/auth', require('./routes/userRoutes'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

