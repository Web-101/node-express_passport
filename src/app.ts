// import libs
import express from 'express';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});