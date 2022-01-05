// import dotenv
import 'dotenv/config';

// import libs
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';

// db config
mongoose
    .connect(process.env.DB_URI as string)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

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

// express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
}));

// connect flash
app.use(flash());

// routes
app.use('/', index);
app.use('/users', users);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
