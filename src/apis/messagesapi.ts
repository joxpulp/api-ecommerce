import { Messages } from '../models/interfaces';
import { flags } from '../config/config';
import { MessagesFactoryDAO } from '../models/messages/messagesFactory';

class messagesAPI {
	private messages;

	constructor() {
		this.messages = MessagesFactoryDAO.get(flags.D);
	}

	async getMessages(): Promise<Messages[]> {
		return await this.messages.find();
	}

	async addMessage(data: Messages): Promise<Messages> {
		const newMessage = await this.messages.add(data);
		return newMessage;
	}
}

export const messageAPI = new messagesAPI();
