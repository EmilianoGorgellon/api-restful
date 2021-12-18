let express = require('express');
let app = express();
let path = require('path');
let cors = require("cors");
const PORT = 3000;

// middlewares
app.use(express.static(path.join(__dirname, "public", "html")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors("*"));

// Routes
app.use('/api/productos', require('./routes/routesProductos'));


app.listen(PORT)