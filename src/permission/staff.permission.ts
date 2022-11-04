import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretTokenKey = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET: 'secret-key';

export const isAunthenticated = (req: Request, res: Response, next: NextFunction)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.status(401).send('You are nt logged in');
    }
}

export const deletePermission = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(token){
        try{
            const  data = jwt.verify(token, secretTokenKey);
            const permissions = (data as JwtPayload).permissions;
            if(permissions.includes('DELETE')){
                return next();
            }else{
                return res.status(401).send('You are not allowed for creating student');
            }
        }catch(err){
            return res.status(401).send({message: 'Invalid token', error: err});
        }
    }
}

export const updatePermission = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(token){
        try{
            const  data = jwt.verify(token, secretTokenKey);
            const permissions = (data as JwtPayload).permissions;
            if(permissions.includes('UPDATE')){
                return next();
            }else{
                return res.status(401).send('You are not allowed for creating student');
            }
        }catch(err){
            return res.status(401).send({message: 'Invalid token', error: err});
        }
    }
}

export const createPermission = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(token){
        try{
            const  data = jwt.verify(token, secretTokenKey);
            const permissions = (data as JwtPayload).permissions;
            if(permissions.includes('CREATE')){
                return next();
            }else{
                return res.status(401).send('You are not allowed for creating student');
            }
        }catch(err){
            return res.status(401).send({message: 'Invalid token', error: err});
        }
    }
}