import { response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt";


export const crearUsuario = async(req, res= response)=>{
    const {email, name, password, roles} = req.body;
    
    try {
        //Verificar el email
        const usuario = await User.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya esta siendo utilizado'
            });
        }
        // Crear el usuario con el modelo
        const dbUser = new User(req.body);
        
        //Asignar roles
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

        //Generar el JWT
        const token = await generarJWT(savedUser._id,name);

        //Generamos respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: savedUser._id,
            name,
            email,
            msg: 'Usuario creado Exitosamente',
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el admin'
        });
    }
}

export const loginUsuario = async(req, res= response)=> {
    
    const {email,password} = req.body;

    try {
        const dbUser = await User.findOne({email});
        if (!dbUser) {
            return res.status(400).json({
                ok:false,
                msg: "El correo no esta registrado"
            });
        }

        //Confirmar si el password matchea
        const validPassword = bcrypt.compareSync( password, dbUser.password);

        if ( !validPassword){
            return res.status(400).json({
                ok:false,
                msg: "Credenciales incorrectas"
            });
        }

        const rolesFoundByObjectId = await Role.find({_id: {$in: dbUser.roles}});
        const rolesFinales = rolesFoundByObjectId.map(role => role.name);

        // Generar el JWT
        const token = await generarJWT(dbUser.id,dbUser.name);
        return res.json({
            ok:true,
            uid: dbUser.id,
            name: dbUser.name,
            roles: rolesFinales,
            email,
            msg: 'Usuario Logeado Exitosamente',
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el admin'
        });
    }
}