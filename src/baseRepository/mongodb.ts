import { Schema, model, connect } from 'mongoose';
import { IRead, IWrite, Messages } from '../models/interfaces';
import { CONFIG } from '../config/config';

const messagesCollection = 'mensajes';

const messagesSchema = new Schema<Messages>(
	{
		email: { type: String, required: true, max: 100 },
		message: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const messages = model<Messages>(messagesCollection, messagesSchema);

export abstract class BaseMongo<T> implements IRead<T>, IWrite<T> {
	private uri: string;
	private messages;

	constructor() {
		this.uri = `mongodb+srv://${CONFIG.MONGO_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_ATLAS_CLUSTER}/${CONFIG.MONGO_DBNAME}?retryWrites=true&w=majority`;
		connect(this.uri);
		this.messages = model<Messages>(messagesCollection, messagesSchema);
	}

	async find(): Promise<Messages[]> {
		let outputGet: Messages[] = [];
		const product = await this.messages.find();
		outputGet.push(...product);
		return outputGet;
	}

	async add(item: T): Promise<Messages> {
		const newProduct = new this.messages(item);
		await newProduct.save();
		return newProduct;
	}
}
