import { Router } from 'express';
import productsRouter from './products';
import cartRouter from './cart';

const router = Router();

router.use('/productos', productsRouter)
router.use('/carrito', cartRouter)

export default router;