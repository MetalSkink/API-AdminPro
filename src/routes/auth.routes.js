import { Router } from "express";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/authJwt";
import { validarCampos } from "../middlewares/validar-campos";
import { crearUsuario, loginUsuario } from "../controllers/auth.controller";

const router = Router();

//Crear Usuario
router.post('/new',[
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña debe ser de 6 caracteres minimo').isLength({min: 6}),
    validarCampos
] ,crearUsuario);

//Login usuario
router.post('/', [
    check('email','el email es obligatorio').isEmail(),
    check('password','la contraseña debe ser de 6 caracteres minimo').isLength({min:6}),
    validarCampos
],loginUsuario);

// //Revalidar token
// router.get('/renew', [
//     verifyToken
// ], revalidarToken);

export default router;