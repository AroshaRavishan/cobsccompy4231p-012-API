const express = require('express');
const helloRoute = require('./routes/helloRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', helloRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
