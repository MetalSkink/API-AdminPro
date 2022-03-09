import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";
import { response } from "express";

export const verifyToken = async(req,res=response,next) => {
    const token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    } 
    
    try {
        const decoded = jwt.verify(token,process.env.SECRET_JWT_SEED);

        req.userId = decoded.id;

        const user = await User.findById(decoded.id, {password: 0})
        if (!user) return res.status(404).json({message: 'no user found'})
        console.log(decoded);

        next();
    } catch (error) {
        return res.status(401).json({message: 'Token no valido'})
    }
}

export const isModerator = async(req,res,next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return;        
        }
    }
    return res.status(403).json({message: "Requiere permisos de moderador"})
}

export const isAdmin = async(req,res,next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return;    
        }
    }
    return res.status(403).json({message: "Requiere permisos de administrador"})
}