const express = require('express');
const dotenv = require('dotenv');
const app = express();

const userRoutes = require('./routes/user.routes');

dotenv.config();


app.use(express.json());
app.use('/user', userRoutes);


app.get('/health', (req, res) => {
    res.json({ message: "OK"}).status(200);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App has started on PORT: ${PORT}`);
})