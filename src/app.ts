// import dotenv
import 'dotenv/config';

// import libs
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

// import files
import index from './routes/index';
import users from './routes/users';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

// set view engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// body parser
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', index);
app.use('/users', users);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
