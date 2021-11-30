import { MessagesDAOMEM } from './DAO/memoria';
import { MessageDAOMONGO } from './DAO/mongodb';

export class MessagesFactoryDAO {
	static get(tipo: string) {
		switch (tipo) {
			case 'MEMORIA':
				return MessagesDAOMEM.instance;
			case 'MONGOATLAS':
				return MessageDAOMONGO.instance;
			default:
				return MessagesDAOMEM.instance;
		}
	}
}
