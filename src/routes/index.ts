import { Router } from 'express';
import productsRouter from './products';
import cartRouter from './cart';

const router = Router();

router.use('/products', productsRouter)
router.use('/cart', cartRouter)

export default router;