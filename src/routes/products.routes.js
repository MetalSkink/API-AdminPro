import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
// import { verifyToken, isModerator,isAdmin } from "../middlewares/index";

const router = Router();


router.post('/', productsCtrl.createProduct)

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.delete('/:productId', productsCtrl.deleteProductById)

router.put('/:productId', productsCtrl.updateProductById)

export default router;