import { Router } from 'express';
import productsRouter from './products';
import cartRouter from './cart';
import messageRouter from './messages'

const router = Router();

router.use('/productos', productsRouter)
router.use('/carrito', cartRouter)
router.use('/mensajes', messageRouter)

export default router;