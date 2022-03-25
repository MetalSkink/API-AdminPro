import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken, isModerator,isAdmin } from "../middlewares/index";

const router = Router();


router.post('/',[
    verifyToken,
    isModerator
], productsCtrl.createProduct)

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.delete('/:productId',[
    verifyToken,
    isAdmin
] , productsCtrl.deleteProductById)

router.put('/:productId',[
    verifyToken,
    isAdmin
] ,productsCtrl.updateProductById)

export default router;