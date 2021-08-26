import { Router } from 'express';
import { cartController } from '../controllers/cart';

const router = Router();

router.get('/listar/:id_producto?', cartController.getProducts);
router.post('/agregar/:id_producto', cartController.addProducts);
router.delete('/borrar/:id_producto', cartController.deleteProducts);

export default router;
