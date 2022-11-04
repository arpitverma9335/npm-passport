import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connection } from './config/database.config'
import { studentRouter } from './routes/student.route'
import { staffRouter } from './routes/staff.route';
const passportConfig = require('./config/passport.config')

const app = express();

app.use(express.json(), bodyParser.urlencoded({extended: false}));

app.use(cors())

passportConfig(app);

app.use('', studentRouter);
app.use('/staff', staffRouter);

connection.then((res)=>{
    app.listen(3000, () => {
        console.log('App is listening on port 3000');
    });
}).catch((err)=>{
    process.exit(1)
});