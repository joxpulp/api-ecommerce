import { Router } from 'express';
import { messageController } from '../controllers/messages';

const router = Router();

router.get('/listar', messageController.getMessages);
router.post('/agregar', messageController.addMessage);

export default router;
