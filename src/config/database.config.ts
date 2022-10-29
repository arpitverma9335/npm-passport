import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/school';

export const connection = mongoose.connect(uri).then((conn)=>{
    console.log('Database connection established');
    return conn
}).catch(err => {
    console.log('database connection refused');
    process.exit(1);
})

// module.exports = connection;