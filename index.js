const express = require('express')
const app = express()
const port = 4000;
const { User } = require("./models/User");
const config = require('./config/key');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected. . .'))
.catch((err) => console.log(err))


app.get('/', (req, res) => res.send('Hello World happy'))

app.post('/register', async (req,res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    try {
        const user = new User(req.body);
        const savedUser = await user.save()     // 콜백X
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false, err});
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))