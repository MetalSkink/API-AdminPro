import { Router } from "express";
import { verifyToken,isAdmin, checkRolesExisted, checkDuplicateEmail } from "../middlewares/index";
import * as userCtrl from "../controllers/user.controller";

const router = Router()

router.post('/', [
    verifyToken,
    isAdmin,
    checkRolesExisted,
    checkDuplicateEmail
],userCtrl.createUser);

router.get('/', [
    verifyToken,
    isAdmin
],userCtrl.getUsuarios)

router.get('/:userId', [
    verifyToken,
    isAdmin
],userCtrl.getUsuarioById)

router.get('/:userId', [
    verifyToken,
    isAdmin
],userCtrl.updateUser)

router.delete('/:userId', [
    verifyToken,
    isAdmin
],userCtrl.deleteUsuario)

export default router;