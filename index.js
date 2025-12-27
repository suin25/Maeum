const express = require('express')
const app = express()
const port = 4000;

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://maeum:suin672033@maeum.anygtuo.mongodb.net/?appName=Maeum')
.then(() => console.log('MongoDB Connected. . .'))
.catch((err) => console.log(err))

const meRouter = require("./routes/me");

app.use("/api", meRouter);

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))