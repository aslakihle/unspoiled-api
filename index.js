const express = require('express');
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};
app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Login routes
app.use('/login', require('./routes/loginRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

