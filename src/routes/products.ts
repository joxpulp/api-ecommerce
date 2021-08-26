import { Router } from 'express';
import { productController } from '../controllers/products';
import { checkAdmin } from '../middleware/isAdmin';

const router = Router();

router.get('/listar/:id?', productController.getProducts);
router.post('/agregar', checkAdmin, productController.addProducts);
router.put('/actualizar/:id', checkAdmin, productController.updateProducts);
router.delete('/borrar/:id', checkAdmin, productController.deleteProducts);

export default router;
