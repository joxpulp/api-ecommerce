import { Messages } from '../../interfaces';
import { BaseMem } from '../../../baseRepository/memoria';
export class MessagesDAOMEM extends BaseMem<Messages> {
	// Private instance of the class to use singleton pattern
	private static _instance: MessagesDAOMEM;

	// Getter to call the instance with singleton pattern.
	public static get instance() {
		if (this._instance) {
			console.log(
				'La instancia MEMORIA MESSAGES ya fue inicializada, se retorna la misma instancia que ya fue inicializada'
			);
			return this._instance;
		} else {
			console.log('Instancia MEMORIA MESSAGES inicializada por primera vez');
			return (this._instance = new this());
		}
	}
}
