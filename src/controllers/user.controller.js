import { response } from "express";
import User from "../models/User";

export const createUser = (req,res=response) =>{
    res.json({
        message:"creando usuario"
    })
}

export const getUsuarios = async(req, res=response) => {

    const usersFound = await User.find();

    // for (let i = 0; i < usersFound.length; i++) {
    //     usersFound[i].password = undefined;
    // }

    usersFound.map(user => {
        user.password = undefined;
    })

    res.json({
        message:"get usuarios",
        usersFound
    })
}

export const getUsuarioById = async(req, res = response) => {
    try {
        const user = await User.findById(req.params.userId)
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}

export const updateUser = async( req, res=response) => {
    req.status(204).json({
        message: "update user"
    })
}

export const deleteUsuario = async(req, res= response) => {
    const { userId } = req.params;
    try {
        const user = await Product.findById(userId);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'El usaurio no existe'
            });
        }
        await User.findByIdAndDelete(userId);
        res.status(204).json();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}