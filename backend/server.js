const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const generateRoute = require('./routes/generate');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sound', generateRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🔥 Backend running on port ${PORT}`));
