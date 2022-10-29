import { Request, Response, NextFunction } from "express";

export const isAunthenticated = (req: Request, res: Response, next: NextFunction)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.status(401).send('You are nt logged in');
    }
}

export const principalPermission = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()){
        const loggedUser = req.user['_doc'];
        if(loggedUser.designation === 'principal'){
            return next();
        }else{
            return res.status(401).send('Only principal is allowed for this operation');
        }
    }else{
        return res.status(400).send('You are not AUTHENTICATED!');
    }
}

export const principalOrSupervisorPermission = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()){
        const loggedUser = req.user['_doc'];
        if(loggedUser.designation === 'principal' || loggedUser.designation === 'supervisor'){
            return next();
        }
        return res.status(401).send('Only principal or  supervisor are allowed for this operation');
    }
    return res.status(400).send('You are not AUTHENTICATED!');
}