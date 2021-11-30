import { IReadMem, IWriteMem } from '../models/interfaces';

export abstract class BaseMem<T> implements IReadMem<T>, IWriteMem<T> {
	content: T[];

	constructor() {
		this.content = [];
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	find(): T[] {
		return this.content;
	}

	add(item: T): T {
		const newMessage: T = {
			_id: this.randomId(),
			...item,
		};
		this.content.push(newMessage);
		return newMessage;
	}
}
