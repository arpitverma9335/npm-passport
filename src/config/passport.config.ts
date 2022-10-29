import session from 'express-session'
import passport from 'passport';
import { staffModel } from './../schemas/staff.schema';
import { Strategy } from 'passport-local';
import { compareSync } from 'bcrypt';
import { IStaff } from './../interface/staff.interface';

module.exports = (app)=>{
    app.use(
        session({
            secret: "123454321",
            resave: true,
            saveUninitialized: true
        }),
        passport.initialize(),
        passport.session()
    )

    passport.serializeUser((user: any, done)=>{
        done(null, user._id);
    })

    passport.deserializeUser((userId, done)=>{
        staffModel.findById(userId).then((staff)=>{
            done(null, staff)
        }).catch((err)=>{
            done(err, false)
        })
    })

    passport.use(new Strategy((username, password, done)=>{
        staffModel.find({username: username}).then((staff: any)=>{
            const user = staff[0]._doc;
            if(!user){
                return done(null, false)
            }
            if(!compareSync(password, user.password)){
                return done(null, false)
            }
            return done(null, user)
        }).catch((err)=>{
            return done(err, false);
        })
    }))
}