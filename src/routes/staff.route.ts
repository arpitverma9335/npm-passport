import express from 'express';
import { staffModel } from '../schemas/staff.schema';
import { hashSync } from 'bcrypt';
import passport from 'passport';
import { isAunthenticated } from '../permission/staff.permission';
import jwt from 'jsonwebtoken';
import { principalPermission, supervisorPermission, teacherPermission } from './../constants/permission.constant';
import { config } from 'dotenv';

config();

export const staffRouter = express.Router();

const secretTokenKey = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET: 'secret-key';

staffRouter.get('/', async (req, res) => {
    staffModel.find({}).then((members) => {
        res.send(members)
    }).catch((err) => {
        res.status(404).send(err);
    });
});

staffRouter.get('/:id', async (req, res) => {
    const staffId = req.params.id;
    staffModel.findById({_id: staffId}).then((member) => {
        res.send(member)
    }).catch((err) => {
        res.status(404).send(err);
    });
});

staffRouter.post('/', async (req, res) => {
    const staff = {...req.body};
    staff.password = hashSync(staff.password, 8);
    const staffMember = new staffModel(staff);
    try{
        await staffMember.save();
        res.send(staffMember);
    }catch(err: any){
        if(err.code === 11000){
            res.status(400).send({message: 'Username already exists', error: err});
        }else{
            res.status(400).send(err)
        }
    }
});

staffRouter.post('/login', passport.authenticate('local', { failureRedirect: ``, failureMessage: true}), (req, res) => {
    try{
        const user: any = req.user;
        let token: string;
        if (user?.designation === 'principal'){
            token = jwt.sign({permissions: principalPermission}, secretTokenKey)
        } else if (user?.designation === 'supervisor'){
            token = jwt.sign({permissions: supervisorPermission}, secretTokenKey)
        } else if (user?.designation === 'teacher'){
            token = jwt.sign({permissions: teacherPermission}, secretTokenKey)
        } else{
            throw new Error('Invalid user!')
        }
        return res.status(201).send({message: "You are logged in successfully!", details: user, token: token})
    }
    catch(err){
        return res.status(401).send(err)
    }
});

staffRouter.post('/logout', isAunthenticated, (req, res)=>{
    req.logOut((err)=>{
        if(err){
            res.status(404).send("Error logging out!");
        }
        res.status(200).send("You are logged out");
    });
})