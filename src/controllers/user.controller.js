import { response } from "express";
import User from "../models/User";

export const createUser = async(req,res=response) =>{
    const {email, name, password, roles} = req.body;

    try {
        const usuario = await User.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya esta siendo utilizado'
            });
        }
        // Crear el usuario con el modelo
        const dbUser = new User(req.body);

        if (roles) {
            const foundRoles = await Role.find({name: {$in: roles}})
            dbUser.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({name: "user"})
            dbUser.roles = [role._id];
        }

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Guardamos el usuario en la BD
        const savedUser = await dbUser.save();

        //Generamos respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: savedUser._id,
            name,
            email,
            msg: 'Usuario creado Exitosamente como Admin',
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el admin'
        });
    }
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
        const user = await User.findById(userId);
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