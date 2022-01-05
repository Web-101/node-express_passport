// import libs
import express from 'express';

// import files
import index from './routes/index';
import users from './routes/users';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

// routes
app.use('/', index);
app.use('/users', users);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
