import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

//Crear Usuario
router.post('/new', [
    check('name', 'el nombre es obligatorio').not().isEmpty,
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña debe ser de 6 caracteres minimo').isLength({min: 6}),
    validarCampos
], crearUsuario);