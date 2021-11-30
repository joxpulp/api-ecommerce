import { Request, Response } from 'express';
import { messageAPI } from '../apis/messagesapi';

class MessageController {
	async getMessages(req: Request, res: Response) {
		try {
			const getMessages = await messageAPI.getMessages();

			if (!getMessages.length)
				return res.status(404).json({ error: 'No hay mensajes cargados' });

			return res.json({ messages: getMessages });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
	async addMessage(req: Request, res: Response) {
		try {
			const { email, message } = req.body;

			if (!email || !message)
				return res.status(404).json({ error: 'Body invalido' });

			const newMessage = await messageAPI.addMessage({ email, message });

			return res.json({ message: newMessage });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
}

export const messageController = new MessageController();
